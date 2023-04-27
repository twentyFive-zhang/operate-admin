import PopButton from '@/components/Common/PopButton';
import {
  pageInfoUsingPOST6,
  deletedUsingDELETE6,
  addRoleUsingPOST2,
  updateDeptUsingPUT4,
} from '@/services/admin/xitongmokuaileixingguanli';

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

const Type: React.FC = () => {
  const request = async (params: API.TypePageReqVO & { current?: number }) => {
    // console.Type({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST6({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  // const deleteType = async (id: number) => {
  //   await deletedUsingDELETE6({ id });
  //   message.success('删除成功!');
  //   actionRef.current?.clearSelected?.();
  //   actionRef.current?.reload();
  // };

  const formColumns: ProFormColumnsType<API.TypeUpdateReqVO>[] = [
    {
      title: '类型ID',
      dataIndex: 'id',
      formItemProps: {
        noStyle: true,
      },
      renderFormItem: () => <></>,
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  const triggerToOpenModal = (type: 'add' | 'update', values?: API.TypeUpdateReqVO) => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(values || { id: undefined });
    setModalVisible(true);
    setModalData({
      type,
      title: type === 'add' ? '新增' : '编辑',
    });
  };

  const columns: ProColumns<API.SysType>[] = [
    {
      title: '类型ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '类型名称',
      dataIndex: 'typeName',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (_text, record, _index, action) => [
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
        <PopButton<API.SysType>
          key="delete"
          {...{
            data: record,
            rowKey: 'id',
            request: deletedUsingDELETE6,
            onSuccess: () => {
              action?.reload();
            },
          }}
        ></PopButton>,
        // <Button
        //   key="delete"
        //   {...{
        //     type: 'primary',
        //     danger: true,
        //     onClick: () => {
        //       const { id } = record;
        //       if (id) deleteType(id);
        //     },
        //   }}
        // >
        //   删除
        // </Button>,
      ],
    },
  ];

  const onFinish = async (values: API.TypeUpdateReqVO) => {
    const { type, title } = modalData;
    const ajaxFun = type === 'add' ? addRoleUsingPOST2 : updateDeptUsingPUT4;
    await ajaxFun(values);
    message.success(`${title}类型成功`);
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
            { breadcrumbName: '类型管理', path: '/sys/port' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysType>
        {...{
          actionRef,
          headerTitle: '类型管理',
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
          pagination: {
            defaultPageSize: 10,
          },
          search: {},
        }}
      ></ProTable>
      <BetaSchemaForm<API.TypeUpdateReqVO>
        {...{
          formRef,
          layoutType: 'ModalForm',
          columns: formColumns,
          open: modalVisible,
          onOpenChange: setModalVisible,
          title: `${modalData.title}类型`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }}
      ></BetaSchemaForm>
    </PageContainer>
  );
};

export default Type;
