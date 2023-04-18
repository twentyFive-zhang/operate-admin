import {
  PageContainer,
  ProTable,
  type ProSchema,
  type ProColumns,
  type ProFormColumnsType,
  BetaSchemaForm,
  type ProFormInstance,
  type ActionType,
  ProDescriptions,
  type ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  pageInfoUsingPOST9,
  detailInfoUsingGET8,
  getDeductionUsingGET,
  addUsingPOST,
  updateUsingPUT,
  importBookkeepingUsingPOST,
  batchExportUsingPOST,
  batchCollectionUsingPOST,
} from '@/services/admin/yewumokuaijizhangguanli';
import { batchCollectionUsingPOST1 } from '@/services/admin/yewumokuaituikuanguanli';
import { Button, Input, Upload, message, Modal, Table, Switch } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { pageInfoUsingPOST8 } from '@/services/admin/yewumokuaikaihuguanli';
import { pageInfoUsingPOST5 } from '@/services/admin/xitongmokuaiyewuyuanguanli';
import { pageInfoUsingPOST6 } from '@/services/admin/xitongmokuaileixingguanli';
import { pageInfoUsingPOST4 } from '@/services/admin/xitongmokuaiduankouguanli';
import { UploadOutlined, ExportOutlined } from '@ant-design/icons';

/** 批量回款 */

export const UseModalMultiple = <T extends object>(
  type: string,
  actionRef: React.MutableRefObject<ActionType | undefined>,
): {
  open: boolean;
  triggerToShowBack: (selectedRows: T[]) => void;
  BookkeepingModal: () => JSX.Element;
  DrawerBackModal: () => JSX.Element;
} => {
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<T[]>([]);
  // const []

  const triggerToShowBack = (selectedRows: T[]) => {
    const salesIdList = Array.from(new Set(selectedRows?.map((item) => item.salesmanName)));
    console.log({ salesIdList }, salesIdList.length);
    if (salesIdList?.length > 1) {
      message.warning('只能批量操作同一业务员的数据,请重新选择');
      return false;
    }
    // return false;
    setOpen(true);
    setList(selectedRows);
  };

  const onFinish = async (values) => {
    const ajaxFun = type === 'drawerBack' ? batchCollectionUsingPOST1 : batchCollectionUsingPOST;
    // @ts-ignore
    await ajaxFun({ ...values, ids: list?.map((item) => item.id) });
    message.success('批量操作成功');
    actionRef.current?.reload();
    setOpen(false);
    return true;
  };

  const BookkeepingModal = () => {
    return (
      <BetaSchemaForm
        {...{
          title: '批量回款',
          layoutType: 'ModalForm',
          open: open && type === 'bookkeeping',
          onOpenChange: (status) => {
            if (status !== open) setOpen(status);
          },
          onFinish,
          columns: [
            {
              title: '已选中记账列表',
              dataIndex: 'ids',
              readonly: true,
              render: () => (
                <Table
                  {...{
                    rowKey: 'id',
                    bordered: true,
                    dataSource: list,
                    pagination: false,
                    summary: () => (
                      <Table.Summary>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            总回款金额
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {/* @ts-ignore */}
                            {list?.reduce((all, item) => (item.collectionAmount || 0) + all, 0) ||
                              0}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    ),
                    columns: [
                      {
                        title: '单号',
                        dataIndex: 'rechargeNumber',
                      },
                      {
                        title: '账号名称',
                        dataIndex: 'accountName',
                      },

                      {
                        title: '回款金额',
                        dataIndex: 'collectionAmount',
                      },
                    ],
                  }}
                ></Table>
              ),
            },
            // {
            //   title: '总回款金额',
            //   dataIndex: 'all',
            //   readonly: true,
            // },
            {
              title: '回款类型',
              dataIndex: 'collection',
              formItemProps: {
                // rules: [{ required: true, message: '请输入回款类型' }],
              },
            },
            {
              title: '对外支付',
              dataIndex: 'externalPayment',
              formItemProps: {
                // rules: [{ required: true, message: '请输入对外支付' }],
              },
            },
          ],
        }}
      ></BetaSchemaForm>
    );
  };

  const DrawerBackModal = () => {
    return (
      <BetaSchemaForm
        {...{
          title: '批量退款',
          layoutType: 'ModalForm',
          open: open && type === 'drawerBack',
          onOpenChange: (status) => {
            setOpen(status);
          },
          onFinish,
          columns: [
            {
              title: '已选中退款列表',
              dataIndex: 'ids',
              readonly: true,
              render: () => (
                <Table<T>
                  {...{
                    rowKey: 'id',
                    bordered: true,
                    dataSource: list,
                    pagination: false,
                    summary: () => (
                      <Table.Summary>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0} colSpan={2}>
                            总退款金额
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {/* @ts-ignore */}
                            {list?.reduce((all, item) => (item.drawbackAmount || 0) + all, 0) || 0}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    ),
                    columns: [
                      {
                        title: '单号',
                        dataIndex: 'drawbackNumber',
                      },
                      {
                        title: '账号名称',
                        dataIndex: 'accountName',
                      },

                      {
                        title: '退款金额',
                        dataIndex: 'drawbackAmount',
                      },
                    ],
                  }}
                ></Table>
              ),
            },
            {
              title: '是否退款',
              dataIndex: 'drawbackStatus',
              valueType: 'select',
              fieldProps: {
                options: [
                  { label: '未退款', value: 0 },
                  { label: '已退款', value: 1 },
                ],
              },
              formItemProps: {
                rules: [{ required: true, message: '请选择是否退款' }],
              },
            },
          ],
        }}
      ></BetaSchemaForm>
    );
  };

  return { open, triggerToShowBack, BookkeepingModal, DrawerBackModal };
};

const ImportFile: React.FC<{ onCbk: () => void }> = ({ onCbk }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const customRequest = async ({ file }) => {
    // console.log({ file });
    setLoading(true);
    try {
      await importBookkeepingUsingPOST({}, file as File, { timeout: 3000000, getResponse: true });
      message.success('导入成功');
      onCbk?.();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <Upload {...{ disabled: loading, showUploadList: false, customRequest }}>
      <Button {...{ icon: <UploadOutlined></UploadOutlined>, loading }}>导入</Button>
    </Upload>
  );
};

const ExportButton: React.FC<{ onBefore: () => API.BookkeepPageReqVO }> = ({ onBefore }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  const toExport = (res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    // 通过创建a标签实现
    const link = document.createElement('a');
    link.href = url;
    // 对下载的文件命名, 如果后端返回名称出现乱码, 需要后端编码一下.
    link.download = decodeURI(res.headers['content-disposition'].split('=')[1]);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onExport = async () => {
    const data = onBefore();
    setLoading(true);
    try {
      const res = await batchExportUsingPOST(data, {
        timeout: 3000000,
        getResponse: true,
        responseType: 'blob',
      });
      // console.log(res);
      toExport(res);
      message.success('导出成功');
    } catch {}
    setLoading(false);
  };

  return (
    <Button
      {...{
        loading,
        icon: <ExportOutlined />,
        onClick: () => {
          onExport();
        },
      }}
    >
      导出
    </Button>
  );
};

const Bookkeeping: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const searchFormRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const [chosenData, setChosenData] = useState<{
    type: 'add' | 'update' | 'detail';
    title: string;
    record: API.AccountRespVO;
  }>();

  const [optionJson, setOptionJson] = useState<{
    [key: string]: API.AccountRespVO[] | API.SysType[];
  }>({
    accountId: [],
    typeId: [],
  });

  const [id, setId] = useState<number>();

  const triggerToOpenModal = async (
    type: 'add' | 'update' | 'detail',
    record?: API.BookkeepRespVO,
  ) => {
    setOpen(true);
    setChosenData({
      type,
      title: { add: '新增记账', update: '编辑记账', detail: '记账详情' }[type],
      record: record || {},
    });
    // if (type !== 'detail') formRef.current?.resetFields();
    setId(record?.id);
    //

    // if (record?.id) {
    //   const { data } = await detailInfoUsingGET8({ id: record.id });
    //   formRef.current?.setFieldsValue(data);
    // }

    // if(record?.id)
  };

  const detailRequest = async (params: { id?: number }) => {
    console.log({ params });
    if (!params?.id) {
      return { data: {}, success: true };
    }
    const { data } = await detailInfoUsingGET8(params as { id: number });
    formRef.current?.setFieldsValue(data || {});
    return { data: data || {}, success: true };
  };

  const [columns, setColumns] = useState<
    (ProSchema<API.BookkeepUpdateReqVO> & ProFormColumnsType<API.BookkeepUpdateReqVO>)[]
  >([
    {
      title: '单号',
      dataIndex: 'rechargeNumber',
      hideInForm: true,
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      hideInSearch: true,
      hideInForm: true,
      fieldProps: {
        disabled: true,
      },
      // readonly: true,
    },

    {
      dataIndex: 'test2',
      valueType: 'divider',
      title: 'test',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      fieldProps: {
        children: '账户信息',
      },
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      hideInForm: true,
    },
    {
      title: '账户名称',
      dataIndex: 'accountId',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      valueType: 'select',
      formItemProps: {
        rules: [{ required: true, message: '请选择账户' }],
      },
      fieldProps: {
        showSearch: true,
        options: [],
        fieldNames: {
          label: 'accountName',
          value: 'id',
        },
        onClear: () => {
          // console.log('clear');
          formRef.current?.setFieldsValue({ portName: undefined, salesmanName: undefined });
        },
      },
    },
    {
      title: '端口',
      dataIndex: 'portName',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
      // dependencies: ['accountId'],
    },

    {
      title: '业务员',
      dataIndex: 'salesmanName',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '行业',
      dataIndex: 'trade',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '行业',
      dataIndex: 'trade1',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      fieldProps: {
        showSearch: true,
        // disabled: true,
      },
      transform: (v) => ({ trade: v }),
    },
    {
      title: '端口',
      dataIndex: 'portId',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      valueType: 'select',
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
      dataIndex: 'test3',
      valueType: 'divider',
      title: 'test',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      fieldProps: {
        children: '充值信息',
      },
    },
    {
      title: '百度币',
      dataIndex: 'currency',
      hideInSearch: true,
    },

    {
      title: '渠道点位',
      dataIndex: 'canalPoint',
      hideInSearch: true,
    },
    {
      title: '回款金额',
      dataIndex: 'collectionAmount',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '回款',
      dataIndex: 'collection',
      hideInSearch: true,
    },
    {
      title: '回款状态',
      dataIndex: 'collectionStatus',
      hideInForm: true,
      // hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '已回款', value: 1 },
          { label: '未回款', value: 0 },
        ],
      },
    },
    {
      title: '是否抵扣完结',
      dataIndex: 'deductionEndStatus',
      valueType: 'select',
      // hideInTable: true,
      hideInForm: true,
      fieldProps: {
        options: [
          { label: '已完结', value: 1 },
          { label: '未完结', value: 0 },
        ],
      },
      render: (_dom, { deductionEndStatus, id }, index, action) => {
        console.log({ deductionEndStatus });
        if (typeof deductionEndStatus === 'number') {
          return (
            <Switch
              {...{
                checkedChildren: '完结',
                unCheckedChildren: '未完结',
                onClick: async () => {
                  try {
                    // await
                  } catch {}
                },
              }}
            ></Switch>
          );
        }
        return <></>;
      },
    },
    {
      title: '拿到点位',
      dataIndex: 'getPoint',
      // hideInSearch: true,
    },
    {
      title: '利润',
      dataIndex: 'profit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '对外结算',
      dataIndex: 'externalSettlement',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '对外支付',
      dataIndex: 'externalPayment',
      // hideInSearch: true,
    },
    {
      title: '对外支付状态',
      dataIndex: 'externalPaymentStatus',
      // hideInSearch: true,
      hideInForm: true,
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
      },
      hideInTable: true,
    },
    {
      title: '抵扣账户名称',
      dataIndex: 'deductionAccountName',
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: true,
    },
    {
      dataIndex: 'test1',
      valueType: 'divider',
      title: 'test',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      fieldProps: {
        children: '抵扣账户信息',
      },
    },
    {
      title: '类型',
      dataIndex: 'typeId',
      hideInTable: true,
      valueType: 'select',
      hideInDescriptions: true,
      colProps: { span: 12 },
      formItemProps: {
        rules: [{ required: true, message: '请选择类型' }],
      },
      fieldProps: {
        showSearch: true,
        options: [],
        fieldNames: {
          label: 'typeName',
          value: 'id',
        },
      },
    },
    {
      title: '抵扣账户搜索',
      dataIndex: 'deductionAccountNameSearch',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
      colProps: { span: 12 },
      tooltip: '请先选择类型',
      renderFormItem: (item, config, form) => (
        <>
          <Input.Search
            {...{
              onSearch: async (value) => {
                form.setFields([
                  { name: 'deductionAccountNameSearch', warnings: [] },
                  { name: 'typeId', warnings: [] },
                ]);
                console.log({ value });
                const { typeId, list = [] } = form.getFieldsValue();
                console.log({ list });
                if (!typeId) {
                  form.setFields([{ name: 'typeId', warnings: ['请先选择类型'] }]);
                }
                if (!value) {
                  form.setFields([
                    { name: 'deductionAccountNameSearch', warnings: ['请输入账户名称'] },
                  ]);
                  return;
                }
                try {
                  const { data } = await getDeductionUsingGET({ accountName: value, typeId });
                  if (data) {
                    // @ts-ignore
                    if (data?.msg) {
                      Modal.confirm({
                        title: '提示',
                        content: data?.msg,
                        onOk: () => {
                          form.setFieldValue(
                            'list',
                            list?.find(
                              (item: { accountName?: string; accountId?: string }) =>
                                item.accountName === data?.accountName,
                            )
                              ? list
                              : [...list, data],
                          );
                        },
                      });
                      return;
                    }
                    form.setFieldValue(
                      'list',
                      list?.find(
                        (item: { accountName?: string; accountId?: string }) =>
                          item.accountName === data?.accountName,
                      )
                        ? list
                        : [...list, data],
                    );
                  }
                } catch (e: any) {
                  console.log(e?.message);

                  form.setFields([
                    { name: 'deductionAccountNameSearch', warnings: [e?.message || ''] },
                  ]);
                }
              },
            }}
          ></Input.Search>
        </>
      ),
    },
    {
      title: '抵扣账户列表',
      dataIndex: 'list',
      hideInSearch: true,
      hideInTable: true,
      hideInForm: true,
      render: (v) => <>{v?.map((item) => item.accountName).join(',')}</>,
    },
    {
      title: '抵扣账户列表',
      dataIndex: 'list',
      valueType: 'formList',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
      colProps: {
        span: 24,
      },
      // copyIconProps: false,
      fieldProps: {
        copyIconProps: false,
        creatorButtonProps: {
          style: {
            display: 'none',
          },
        },
        // actionRender: (field, action, defaultActionDom) => {
        //   console.log({ defaultActionDom });
        //   return defaultActionDom;
        // },
      },
      // renderFormItem: (item, { defaultRender }) => {
      //   return defaultRender(item as ProSchema<API.BookkeepUpdateReqVO, 'form'>);
      // },
      columns: [
        {
          // title: '抵扣账户名称',
          dataIndex: 'accountName',
          readonly: true,
          fieldProps: (form, config) => ({
            onBlur: (...args) => {
              console.log({ args, form, config });
            },
          }),
          colProps: { span: 12 },
        },
        {
          title: '抵扣账户ID',
          dataIndex: 'accountId',
          formItemProps: {
            noStyle: true,
          },
          renderFormItem: () => <></>,
        },
      ],
    },

    {
      title: '抵扣金额',
      dataIndex: 'deductionAmount',
      hideInSearch: true,
    },
    {
      title: '是否抵扣',
      dataIndex: 'deductionStatus',
      // hideInSearch: true,
      valueType: 'select',
      hideInForm: true,
      fieldProps: {
        options: [
          { label: '是', value: 1 },
          { label: '否', value: 0 },
        ],
      },
    },
    {
      title: '业务员',
      dataIndex: 'salesmanId',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: [],
        fieldNames: {
          label: 'salesmanName',
          value: 'id',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInForm: true,
      fieldProps: {
        options: [
          { label: '进行中', value: 1 },
          { label: '已完成', value: 0 },
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
      title: '创建日期',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新人',
      dataIndex: 'updateName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新日期',
      dataIndex: 'update',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '日期',
      dataIndex: 'createTime1',
      valueType: 'dateRange',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      transform: ([startTime, endTime]) => ({ startTime, endTime }),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      hideInSearch: true,
      valueType: 'textarea',
      colProps: { span: 24 },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      hideInDescriptions: true,
      render: (_text, record) => {
        return [
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
            key="detail"
            {...{
              type: 'primary',
              onClick: () => {
                triggerToOpenModal('detail', record);
              },
            }}
          >
            详情
          </Button>,
        ];
      },
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const getOptions = async () => {
    setLoading(true);
    try {
      const list = await Promise.all([
        pageInfoUsingPOST8({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST4({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST6({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST5({ pageNum: 1, pageSize: 100000 }),
      ]);
      // 所以我不喜欢数组
      const keyList = ['accountId', 'portId', 'typeId', 'salesmanId'];
      setOptionJson({
        accountId: list[0]?.data?.list || [],
        typeId: list[2]?.data?.list || [],
      });
      // console.log({ optionJson });
      const getList = (list: any[], key: string) => {
        if (key === 'portId')
          return list?.map?.((item) => ({
            ...item,
            label: `${item.portName || '端口名称'}（${item.portNumber}）`,
          }));
        return list;
      };
      setColumns(
        columns.map((item) => {
          const { fieldProps } = item;

          return {
            ...item,
            fieldProps: {
              ...fieldProps,
              options: keyList.includes(item.dataIndex as string)
                ? getList(
                    list[keyList.findIndex((s) => s === item.dataIndex)]?.data?.list as any[],
                    item.dataIndex as string,
                  ) || []
                : //@ts-ignore
                  fieldProps?.options || [],
            },
          };
        }),
      );
    } catch {}
    setLoading(false);
  };
  useEffect(() => {
    getOptions();
  }, []);

  const onValuesChange = (changedValues: any) => {
    // console.log({ changedValues });
    const [key, value] = Object.entries(changedValues)?.[0] || [];
    if (key === 'accountId') {
      const { accountId: list = [] } = optionJson;
      const { portName, salesmanName, trade } = list.find((item) => item.id === value) || {};
      console.log({ portName, salesmanName, optionJson });
      formRef.current?.setFieldsValue({ portName, salesmanName, trade });
    }
    // console.log({ key, value, changedValues });
  };

  const onFinish = async (values: API.BookkeepUpdateReqVO) => {
    const { type, record = {}, title } = chosenData || {};
    const ajaxFun = type === 'add' ? addUsingPOST : updateUsingPUT;
    await ajaxFun({ ...record, ...values });
    message.success(`${title}成功`);
    setOpen(false);
    actionRef.current?.reload();
  };

  const { triggerToShowBack, BookkeepingModal } = UseModalMultiple<API.BookkeepUpdateReqVO>(
    'bookkeeping',
    actionRef,
  );
  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '业务', path: '/yw' },
            { breadcrumbName: '记账管理', path: '/yw/bookkeeping' },
          ],
        },
        title: '',
        loading,
      }}
    >
      <BookkeepingModal></BookkeepingModal>
      <ProTable<API.BookkeepUpdateReqVO>
        {...{
          headerTitle: '记账列表',
          rowKey: 'id',
          scroll: { x: 2600 },
          rowSelection: {},
          formRef: searchFormRef,
          actionRef,
          toolBarRender: (action, { selectedRows }) => [
            <Button
              key="multiple-update"
              {...{
                disabled: !selectedRows?.length,
                onClick: () => {
                  if (selectedRows?.length) triggerToShowBack(selectedRows);
                },
              }}
            >
              批量回款
            </Button>,
            <ImportFile
              key="import"
              {...{
                onCbk: () => {
                  actionRef.current?.reload();
                },
              }}
            ></ImportFile>,
            <ExportButton
              key="export"
              {...{
                onBefore: () => {
                  const data = searchFormRef.current?.getFieldsFormatValue?.() || {};
                  return data;
                },
              }}
            ></ExportButton>,
            <Button
              key="add"
              {...{
                type: 'primary',
                onClick: () => {
                  formRef.current?.resetFields();
                  formRef.current?.setFieldValue('typeId', optionJson?.typeId?.[0]?.id);
                  triggerToOpenModal('add');
                },
              }}
            >
              新增
            </Button>,
          ],
          columns: columns as ProColumns<API.BookkeepPageRespVO>[],
          request: async (params: API.BookkeepPageReqVO & { current?: number }) => {
            const { current: pageNum, ...rest } = params;
            const { data } = await pageInfoUsingPOST9({ ...rest, pageNum });
            return { data: data?.list || [], total: data?.totalRows || 0 };
          },
        }}
      ></ProTable>
      <BetaSchemaForm<API.BookkeepUpdateReqVO>
        {...{
          modalProps: { width: '80%' },
          layout: 'vertical',
          grid: true,
          rowProps: { gutter: 20 },
          title: chosenData?.title,
          colProps: { xs: 24, md: 12, xl: 8, xxl: 8 },
          open: open && chosenData?.type !== 'detail',
          onOpenChange: (status: boolean) => {
            // console.log({ status, open });
            if (open !== status) setOpen(status);
          },
          formRef,
          layoutType: 'ModalForm',
          columns: columns as ProFormColumnsType<API.BookkeepUpdateReqVO>[],
          onValuesChange,
          onFinish,
          params: { id },
          request: detailRequest,
          // readonly: chosenData?.type === 'detail',
        }}
      ></BetaSchemaForm>
      <Modal
        {...{
          open: open && chosenData?.type === 'detail',
          onOpenChange: (status: boolean) => {
            console.log({ status, open });
            if (open !== status) setOpen(status);
          },
          onCancel: () => {
            setOpen(false);
          },
          footer: null,
          width: '80%',
          title: '记账详情',
        }}
      >
        <ProDescriptions
          {...{
            column: 2,
            bordered: true,
            size: 'middle',
            params: { id },
            request: detailRequest,
            columns: columns as ProDescriptionsItemProps<API.BookkeepUpdateReqVO>[],
          }}
        ></ProDescriptions>
      </Modal>
    </PageContainer>
  );
};

export default Bookkeeping;