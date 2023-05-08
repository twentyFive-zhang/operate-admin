import {
  pageInfoUsingPOST8,
  // deletedUsingDELETE7,
  addAccountUsingPOST,
  updateAccountUsingPUT,
  detailInfoUsingGET7,
} from '@/services/admin/yewumokuaikaihuguanli';

import { pageInfoUsingPOST4 } from '@/services/admin/xitongmokuaiduankouguanli';

import {
  PageContainer,
  ProTable,
  type ProColumns,
  type ProSchema,
  type ActionType,
  BetaSchemaForm,
  type ProFormColumnsType,
  type ProFormInstance,
  ProDescriptions,
  type ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { pageInfoUsingPOST5 } from '@/services/admin/xitongmokuaiyewuyuanguanli';

const Account: React.FC = () => {
  const request = async (params: API.AccountPageReqVO & { current?: number }) => {
    // console.Account({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST8({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  // const deleteAccount = async (id: number) => {
  //   await deletedUsingDELETE7({ id });
  //   message.success('删除成功!');
  //   actionRef.current?.clearSelected?.();
  //   actionRef.current?.reload();
  // };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update' | 'detail'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  const triggerToOpenModal = async (
    type: 'add' | 'update' | 'detail',
    values?: API.AccountUpdateReqVO,
  ) => {
    setModalVisible(true);
    setModalData({
      type,
      title: { add: '新增', update: '编辑', detail: '详情' }[type],
    });
    if (type === 'detail') return;
    formRef.current?.resetFields();
    if (values?.id) {
      const { data } = await detailInfoUsingGET7({ id: values.id });
      formRef.current?.setFieldsValue(data);
    } else {
      formRef.current?.setFieldsValue({ id: undefined });
    }
  };

  const [id, setId] = useState<number>();

  const [columns, setColumns] = useState<ProSchema<API.AccountRespVO>[]>([
    {
      title: '账户ID',
      dataIndex: 'id',
      hideInSearch: true,
      formItemProps: {
        noStyle: true,
      },
      renderFormItem: () => <></>,
      hideInDescriptions: true,
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      formItemProps: {
        rules: [{ required: true, message: '请输入账户名称' }],
      },
    },
    {
      title: '端口',
      dataIndex: 'portId',
      hideInTable: true,
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true, message: '请选择端口' }],
      },
      fieldProps: {
        options: [],
        showSearch: true,
        fieldNames: {
          label: 'label',
          value: 'id',
        },
      },
    },
    {
      title: '端口',
      dataIndex: 'portName',
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_dom, { portName, portNumber }) => `${portName}-${portNumber}`,
    },
    // {
    //   title: '端口编号',
    //   dataIndex: 'portNumber',
    //   hideInSearch: true,
    //   hideInForm: true,
    //   hideInDescriptions: true,
    // },
    {
      title: '业务员',
      dataIndex: 'salesmanId',
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true, message: '请选择业务员' }],
      },
      fieldProps: {
        options: [],
        showSearch: true,

        fieldNames: {
          label: 'salesmanName',
          value: 'id',
        },
      },
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: '业务员',
      dataIndex: 'salesmanId',
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true, message: '请选择业务员' }],
      },
      fieldProps: {
        options: [],
        showSearch: true,

        fieldNames: {
          label: 'salesmanName',
          value: 'id',
        },
      },
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '业务员名称',
      dataIndex: 'salesmanName',
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: true,
    },
    {
      title: '行业',
      dataIndex: 'trade',
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'textarea',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      hideInSearch: true,
      hideInForm: true,
      fieldProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
    {
      title: '创建人',
      dataIndex: 'createName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改人',
      dataIndex: 'updateName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      hideInDescriptions: true,
      // @ts-ignore
      fixed: 'right',
      render: (_text, record) => [
        <Button
          key="update"
          {...{
            type: 'primary',
            onClick: () => {
              setId(record.id);
              triggerToOpenModal('update', record);
            },
          }}
        >
          编辑
        </Button>,
        <Button
          key="detail"
          {...{
            type: 'primary',
            onClick: () => {
              setId(record.id);
              triggerToOpenModal('detail', record);
            },
          }}
        >
          详情
        </Button>,
        // <Button
        //   key="delete"
        //   {...{
        //     type: 'primary',
        //     danger: true,
        //     onClick: () => {
        //       const { id } = record;
        //       if (id) deleteAccount(id);
        //     },
        //   }}
        // >
        //   删除
        // </Button>,
      ],
    },
  ]);

  const getOptions = async () => {
    const [{ data: data1 }, { data: data2 }] = await Promise.all([
      pageInfoUsingPOST4({ pageNum: 1, pageSize: 100000 }),
      pageInfoUsingPOST5({ pageNum: 1, pageSize: 100000 }),
    ]);
    setColumns(
      columns.map((item) => {
        const { dataIndex, fieldProps } = item;
        // if (dataIndex === 'portId') item!.fieldProps!.options = data1?.list || [];
        return {
          ...item,
          fieldProps: {
            ...fieldProps,
            ...(dataIndex === 'portId'
              ? {
                  options:
                    data1?.list?.map?.((item) => ({
                      ...item,
                      label: `${item.portName || '端口名称'}（${item.portNumber}）`,
                    })) || [],
                }
              : {}),
            ...(dataIndex === 'salesmanId'
              ? {
                  options:
                    (item.hideInSearch
                      ? data2?.list?.filter((item) => item.status === 1)
                      : data2?.list) || [],
                }
              : {}),
          },
        };
      }),
    );
  };

  useEffect(() => {
    getOptions();
  }, []);

  const onFinish = async (values: API.AccountUpdateReqVO) => {
    const { type, title } = modalData;
    const ajaxFun = type === 'add' ? addAccountUsingPOST : updateAccountUsingPUT;
    await ajaxFun(values);
    message.success(`${title}开户成功`);
    actionRef.current?.reload();
    return true;
  };

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '业务', path: '/yw' },
            { breadcrumbName: '开户管理', path: '/yw/account' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.AccountRespVO>
        {...{
          actionRef,
          pagination: {
            defaultPageSize: 10,
            showSizeChanger: true,
          },
          headerTitle: '开户管理',
          // search: false,
          columns: columns as ProColumns<API.AccountRespVO>[],
          request,
          rowKey: 'id',
          toolBarRender: () => [
            <Button
              key="add"
              {...{
                type: 'primary',
                onClick: () => {
                  setId(undefined);
                  // formRef.current?.resetFields();
                  // formRef.current?.setFieldsValue({ id: undefined });
                  triggerToOpenModal('add');
                },
              }}
            >
              新增
            </Button>,
          ],
          rowSelection: false,
          bordered: true,
          // pagination: {},
          search: {},
          scroll: {
            x: 1400,
          },
        }}
      ></ProTable>
      <BetaSchemaForm<API.AccountUpdateReqVO>
        {...{
          name: 'accountModal',
          formRef,
          layoutType: 'ModalForm',
          columns: columns as ProFormColumnsType<API.AccountUpdateReqVO>[],
          open: modalVisible && modalData.type !== 'detail',
          onOpenChange: setModalVisible,
          title: `${modalData.title}开户`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
          readonly: modalData.type === 'detail',
        }}
      ></BetaSchemaForm>
      <Modal
        {...{
          open: modalVisible && modalData.type === 'detail',
          footer: null,
          onCancel: () => {
            setModalVisible(false);
          },
          title: '开户详情',
          width: '80%',
        }}
      >
        <ProDescriptions<API.AccountUpdateReqVO>
          {...{
            params: { id },
            request: async (params) => {
              const { data } = await detailInfoUsingGET7(params as API.detailInfoUsingGET7Params);
              return { success: true, data };
            },
            column: 2,
            bordered: true,
            size: 'middle',
            columns: columns as ProDescriptionsItemProps<API.AccountUpdateReqVO>[],
          }}
        ></ProDescriptions>
      </Modal>
    </PageContainer>
  );
};

export default Account;
