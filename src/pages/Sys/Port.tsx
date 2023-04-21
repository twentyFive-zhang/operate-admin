import {
  pageInfoUsingPOST4,
  deletedUsingDELETE4,
  addRoleUsingPOST1,
  updateDeptUsingPUT2,
} from '@/services/admin/xitongmokuaiduankouguanli';

import {
  PageContainer,
  ProTable,
  type ProColumns,
  type ActionType,
  BetaSchemaForm,
  type ProFormColumnsType,
  type ProFormInstance,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';

const Port: React.FC = () => {
  const request = async (params: API.PortPageReqVO & { current?: number }) => {
    // console.Port({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST4({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  const deletePort = async (id: number) => {
    await deletedUsingDELETE4({ id });
    message.success('删除成功!');
    actionRef.current?.clearSelected?.();
    actionRef.current?.reload();
  };

  const formColumns: ProFormColumnsType<API.PortUpdateReqVO>[] = [
    {
      title: '端口ID',
      dataIndex: 'id',
      formItemProps: {
        noStyle: true,
      },
      renderFormItem: () => <></>,
    },
    {
      title: '端口名称',
      dataIndex: 'portName',
    },
    {
      title: '端口编号',
      dataIndex: 'portNumber',
      // valueType: 'digit',
      // fieldProps: {
      //   precision: 0,
      // },
    },
    {
      title: '拿到点位',
      dataIndex: 'getPoint',
      valueType: 'digit',
      fieldProps: {
        precision: 2,
      },
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  const triggerToOpenModal = (type: 'add' | 'update', values?: API.PortUpdateReqVO) => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(values || { id: undefined });
    setModalVisible(true);
    setModalData({
      type,
      title: type === 'add' ? '新增' : '编辑',
    });
  };

  const columns: ProColumns<API.SysPort>[] = [
    {
      title: '端口ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '端口名称',
      dataIndex: 'portName',
    },
    {
      title: '端口编号',
      dataIndex: 'portNumber',
    },

    {
      title: '拿到点位',
      dataIndex: 'getPoint',
      valueType: 'digit',
      fieldProps: {
        precision: 2,
      },
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (_text, record) => [
        <Button
          key="update"
          {...{
            type: 'primary',
            onClick: () => {
              triggerToOpenModal('update', record);
            },
          }}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          {...{
            type: 'primary',
            danger: true,
            onClick: () => {
              const { id } = record;
              if (id) deletePort(id);
            },
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  const onFinish = async (values: API.PortUpdateReqVO) => {
    const { type, title } = modalData;
    const ajaxFun = type === 'add' ? addRoleUsingPOST1 : updateDeptUsingPUT2;
    await ajaxFun(values);
    message.success(`${title}端口成功`);
    actionRef.current?.reload();
    return true;
  };

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '系统', path: '/sys' },
            { breadcrumbName: '端口管理', path: '/sys/port' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysPort>
        {...{
          actionRef,
          headerTitle: '端口管理',
          // search: false,
          columns,
          request,
          rowKey: 'id',
          toolBarRender: () => [
            <Button
              key="add"
              {...{
                type: 'primary',
                onClick: () => {
                  triggerToOpenModal('add');
                },
              }}
            >
              新增
            </Button>,
          ],
          rowSelection: false,
          bordered: true,
          pagination: {},
          search: {},
        }}
      ></ProTable>
      <BetaSchemaForm<API.PortUpdateReqVO>
        {...{
          formRef,
          layoutType: 'ModalForm',
          columns: formColumns,
          open: modalVisible,
          onOpenChange: setModalVisible,
          title: `${modalData.title}端口`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }}
      ></BetaSchemaForm>
    </PageContainer>
  );
};

export default Port;
