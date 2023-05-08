import {
  pageInfoUsingPOST5,
  // deletedUsingDELETE5,
  addSysSalesmanUsingPOST,
  updateDeptUsingPUT3,
} from '@/services/admin/xitongmokuaiyewuyuanguanli';

import {
  PageContainer,
  ProTable,
  type ProColumns,
  type ActionType,
  BetaSchemaForm,
  type ProFormColumnsType,
  type ProFormInstance,
} from '@ant-design/pro-components';
import { Button, Switch, message } from 'antd';
import { useRef, useState } from 'react';

const Salesman: React.FC = () => {
  const request = async (params: API.SalesmanPageReqVO & { current?: number }) => {
    // console.Salesman({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST5({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  // const deleteSalesman = async (id: number) => {
  //   await deletedUsingDELETE5({ id });
  //   message.success('删除成功!');
  //   actionRef.current?.clearSelected?.();
  //   actionRef.current?.reload();
  // };

  const formColumns: ProFormColumnsType<API.SalesmanUpdateReqVO>[] = [
    {
      title: '业务员ID',
      dataIndex: 'id',
      // readonly: true,
      formItemProps: {
        noStyle: true,
      },
      renderFormItem: () => <></>,
    },
    {
      title: '业务员名称',
      dataIndex: 'salesmanName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            value: 0,
            label: '禁用',
          },
          {
            value: 1,
            label: '启用',
          },
        ],
      },
    },
  ];

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  const triggerToOpenModal = (type: 'add' | 'update', values?: API.SalesmanUpdateReqVO) => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(values || { id: undefined });
    setModalVisible(true);
    setModalData({
      type,
      title: type === 'add' ? '新增' : '编辑',
    });
  };

  const columns: ProColumns<API.SysSalesman>[] = [
    {
      title: '业务员ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '业务员名称',
      dataIndex: 'salesmanName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            value: 0,
            label: '禁用',
          },
          {
            value: 1,
            label: '启用',
          },
        ],
      },
      render: (_dom, record) => {
        return (
          <Switch
            {...{
              checkedChildren: '启用',
              unCheckedChildren: '禁用',
              checked: !!record.status,
              onClick: async () => {
                await updateDeptUsingPUT3({ id: record.id, status: !record.status ? 1 : 0 });
                message.success(`${!record.status ? '启用' : '禁用'}成功`);
                actionRef.current?.reload();
              },
            }}
          ></Switch>
        );
      },
      // valueEnum: {
      //   0: {
      //     text: '禁用',
      //   },
      //   1: {
      //     text: '启用',
      //   },
      // },
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
        // record.status === 1 && (
        //   <Button key="start" {...{ type: 'primary', onClick: async () => {

        //   } }}>
        //     启用
        //   </Button>
        // ),
        // record.status === 0 && <Button key="end">禁用</Button>,
        // <Button
        //   key="delete"
        //   {...{
        //     type: 'primary',
        //     danger: true,
        //     onClick: () => {
        //       const { id } = record;
        //       if (id) deleteSalesman(id);
        //     },
        //   }}
        // >
        //   删除
        // </Button>,
      ],
    },
  ];

  const onFinish = async (values: API.SalesmanUpdateReqVO) => {
    try {
      const { type, title } = modalData;
      const ajaxFun = type === 'add' ? addSysSalesmanUsingPOST : updateDeptUsingPUT3;
      await ajaxFun(values);
      message.success(`${title}业务员成功`);
      actionRef.current?.reload();
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '系统', path: '/sys' },
            { breadcrumbName: '业务员管理', path: '/sys/port' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysSalesman>
        {...{
          actionRef,
          headerTitle: '业务员管理',
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
            showSizeChanger: true,
          },
          search: {},
        }}
      ></ProTable>
      <BetaSchemaForm<API.SalesmanUpdateReqVO>
        {...{
          formRef,
          layoutType: 'ModalForm',
          columns: formColumns,
          open: modalVisible,
          onOpenChange: setModalVisible,
          title: `${modalData.title}业务员`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }}
      ></BetaSchemaForm>
    </PageContainer>
  );
};

export default Salesman;
