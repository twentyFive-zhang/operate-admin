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
  // type ColumnsState
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
  deletedUsingDELETE8,
} from '@/services/admin/yewumokuaijizhangguanli';
import { batchCollectionUsingPOST1 } from '@/services/admin/yewumokuaituikuanguanli';
import { Button, Input, Upload, message, Modal, Table, Switch, InputNumber } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { pageInfoUsingPOST8 } from '@/services/admin/yewumokuaikaihuguanli';
import { pageInfoUsingPOST5 } from '@/services/admin/xitongmokuaiyewuyuanguanli';
import { pageInfoUsingPOST6 } from '@/services/admin/xitongmokuaileixingguanli';
import { pageInfoUsingPOST4 } from '@/services/admin/xitongmokuaiduankouguanli';
import { UploadOutlined, ExportOutlined } from '@ant-design/icons';
import { useColumnsState } from '@/hooks';
import PopButton from '@/components/Common/PopButton';
import { useModel } from '@umijs/max';

/** 是否是管理员，傻缺逻辑 */
export const useAccountAccess = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  console.log({ currentUser });
  return {
    isAdmin: !!currentUser?.username && ['guanli', 'admin'].includes(currentUser?.username),
  };
};

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
    // 扯，突然不要同一个业务员了
    // const salesIdList = Array.from(new Set(selectedRows?.map((item) => item.salesmanName)));
    // console.log({ salesIdList }, salesIdList.length);
    // if (salesIdList?.length > 1) {
    //   message.warning('只能批量操作同一业务员的数据,请重新选择');
    //   return false;
    // }
    // return false;
    setOpen(true);
    setList(selectedRows);
  };

  const onFinish = async (values) => {
    console.log({ values });
    // return;
    const ajaxFun = type === 'drawerBack' ? batchCollectionUsingPOST1 : batchCollectionUsingPOST;
    // @ts-ignore
    await ajaxFun({ ...values, ids: list?.map((item) => item.id) });
    message.success('批量操作成功');
    actionRef.current?.reload();
    setOpen(false);
    actionRef.current?.clearSelected?.();

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
                <Table<T>
                  {...{
                    rowKey: 'id',
                    bordered: true,
                    dataSource: list,
                    pagination: false,

                    scroll: { y: 300 },
                    summary: () => (
                      <Table.Summary {...{ fixed: true }}>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0}>总额</Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {parseFloat(
                              // @ts-ignore
                              list?.reduce((all, item) => (item.currency || 0) + all, 0) || 0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={2}></Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                            {/* @ts-ignore */}
                            {parseFloat(
                              // @ts-ignore
                              list?.reduce((all, item) => (item.collectionAmount || 0) + all, 0) ||
                                0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4}>
                            {/* @ts-ignore */}
                            {parseFloat(
                              // @ts-ignore
                              list?.reduce(
                                (all, item) => (item.externalSettlement || 0) + all,
                                0,
                              ) || 0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    ),
                    columns: [
                      // {
                      //   title: '单号',
                      //   dataIndex: 'rechargeNumber',
                      // },
                      {
                        title: '账号名称',
                        dataIndex: 'accountName',
                      },
                      {
                        title: '百度币',
                        dataIndex: 'currency',
                      },

                      {
                        title: '渠道点位',
                        dataIndex: 'canalPoint',
                        valueType: 'digit',
                        fieldProps: {
                          precision: 2,
                        },
                      },
                      {
                        title: '回款金额',
                        dataIndex: 'collectionAmount',
                      },
                      {
                        title: '对外结算',
                        dataIndex: 'externalSettlement',
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
            {
              title: '备注',
              dataIndex: 'remarks',
            },
          ],
        }}
      ></BetaSchemaForm>
    );
  };

  const DrawerBackModal = () => {
    const [nList, setNList] = useState<T[]>([]);
    useEffect(() => {
      console.log({ list });
      setNList(JSON.parse(JSON.stringify(list)));
    }, [list]);
    // useEffect(() => {
    //   console.log('nlist 更新', nList);
    // }, [nList]);
    return (
      <BetaSchemaForm
        {...{
          title: `批量退款-【${nList?.[0]?.salesmanName}】`,
          layoutType: 'ModalForm',
          open: open && type === 'drawerBack',
          onOpenChange: (status) => {
            setOpen(status);
          },
          onFinish: (values) => {
            const { remarks } = values;
            onFinish({
              ...values,
              list: nList.map(({ id, currency }) => ({
                id,
                currency,
                ...(remarks ? { remarks } : {}),
              })),
            });
          },
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
                    dataSource: nList,
                    pagination: false,
                    scroll: { y: 300 },
                    summary: () => (
                      <Table.Summary {...{ fixed: true }}>
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0}>总额</Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            {parseFloat(
                              // @ts-ignore
                              nList?.reduce((all, item) => (item.currency || 0) + all, 0) || 0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={2}></Table.Summary.Cell>
                          <Table.Summary.Cell index={3}>
                            {/* @ts-ignore */}
                            {parseFloat(
                              // @ts-ignore
                              nList?.reduce((all, item) => (item.drawbackAmount || 0) + all, 0) ||
                                0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                          <Table.Summary.Cell index={4}></Table.Summary.Cell>
                          <Table.Summary.Cell index={5}>
                            {/* @ts-ignore */}
                            {parseFloat(
                              // @ts-ignore
                              nList?.reduce(
                                (all, item) => (item.externalSettlement || 0) + all,
                                0,
                              ) || 0,
                            ).toFixed(2)}
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    ),
                    columns: [
                      // {
                      //   title: '退款单号',
                      //   dataIndex: 'drawbackNumber',
                      // },
                      {
                        title: '账号名称',
                        dataIndex: 'accountName',
                      },
                      {
                        title: '百度币',
                        dataIndex: 'currency',
                        render: (value, { id }) => (
                          <InputNumber
                            {...{
                              defaultValue: value,
                              precision: 2,
                              onBlur: (v) => {
                                console.log({ v }, v.target.value);
                                setNList([
                                  ...nList.map((item) =>
                                    item.id === id
                                      ? {
                                          ...item,
                                          currency: Number(v.target.value) * 1,
                                          drawbackAmount:
                                            // @ts-ignore
                                            (v.target.value / item.canalPoint).toFixed(2) * 1,
                                          externalSettlement:
                                            // @ts-ignore
                                            (v.target.value / item.getPoint).toFixed(2) * 1,
                                        }
                                      : item,
                                  ),
                                ]);
                              },
                            }}
                          ></InputNumber>
                        ),
                      },
                      {
                        title: '渠道点位',
                        dataIndex: 'canalPoint',
                      },

                      {
                        title: '退款金额',
                        dataIndex: 'drawbackAmount',
                        // render: (_v, { canalPoint, currency }) =>
                        //   (currency / canalPoint).toFixed(2),
                      },
                      {
                        title: '拿到点位',
                        dataIndex: 'getPoint',
                      },
                      {
                        title: '对外结算',
                        dataIndex: 'externalSettlement',
                        // render: (_v, { currency, getPoint }) => (currency / getPoint).toFixed(2),
                      },
                      // {
                      //   title: '备注',
                      //   dataIndex: 'remarks',
                      //   render: (value, { id }) => (
                      //     <Input
                      //       {...{
                      //         defaultValue: value,
                      //         onBlur: (v) => {
                      //           setNList([
                      //             ...nList.map((item) =>
                      //               item.id === id
                      //                 ? { ...item, remarks: v.target.value }
                      //                 : { ...item },
                      //             ),
                      //           ]);
                      //         },
                      //       }}
                      //     ></Input>
                      //   ),
                      // },
                    ],
                  }}
                ></Table>
              ),
            },
            {
              title: '核对/退款',
              dataIndex: 'selectStatus',
              valueType: 'select',
              formItemProps: {
                rules: [{ required: true, message: '请选择' }],
              },

              fieldProps: {
                options: [
                  { label: '核对', value: 0 },
                  { label: '退款', value: 1 },
                ],
              },
            },
            {
              valueType: 'dependency',
              name: ['selectStatus'],
              columns: ({ selectStatus }) =>
                selectStatus === 1
                  ? [
                      {
                        title: '是否退款',
                        dataIndex: 'drawbackStatus',
                        valueType: 'select',
                        fieldProps: {
                          options: [
                            { label: '未退款', value: 0 },
                            { label: '已退款', value: 1 },
                            { label: '不退款', value: 2 },
                          ],
                        },
                        formItemProps: {
                          rules: [{ required: true, message: '请选择' }],
                        },
                      },
                    ]
                  : selectStatus === 0
                  ? [
                      {
                        title: '备注',
                        dataIndex: 'remarks',
                        formItemProps: {
                          rules: [{ required: true, message: '请选择' }],
                        },
                      },
                    ]
                  : [],
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

const useRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return {
    selectedRowKeys,
  };
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

  const { isAdmin } = useAccountAccess();

  const [columns, setColumns] = useState<
    (ProSchema<API.BookkeepUpdateReqVO> & ProFormColumnsType<API.BookkeepUpdateReqVO>)[]
  >([
    {
      title: '充值单号',
      dataIndex: 'rechargeNumber',
      hideInForm: true,
      width: '160px',
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
      width: '160px',
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      hideInForm: true,
      hideInTable: true,
      hideInDescriptions: true,
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
    },

    {
      title: '账户名称',
      dataIndex: 'accountId',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      valueType: 'select',
      // transform: ({ id }) => ({ accountId: id }),
      request: async ({ keyWords }) => {
        console.log({ keyWords });
        if (!keyWords) return [];
        const {
          data: { list },
        } = await pageInfoUsingPOST8({
          accountName: keyWords,
          pageNum: 1,
          pageSize: 100,
        });
        return list;
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择账户' }],
      },
      fieldProps: {
        showSearch: true,
        // options: [],
        labelInValue: true,

        fieldNames: {
          label: 'accountName',
          // value: 'id',
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
      // hideInForm: true,
      hideInTable: true,
      fieldProps: {
        disabled: true,
      },
      // dependencies: ['accountId'],
    },
    {
      title: '端口',
      dataIndex: 'portName',
      hideInSearch: true,
      hideInForm: true,
      hideInDescriptions: true,
      render: (_dom, { portName, portNumber }) => `${portName}-${portNumber}`,
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
      title: '类型',
      dataIndex: 'typeId',
      hideInTable: true,
      valueType: 'select',
      hideInDescriptions: true,
      // colProps: { span: 12 },
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
      valueType: 'digit',
      fieldProps: {
        precision: 2,
      },
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
      // hideInSearch: true,
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
        // console.log({ deductionEndStatus });
        if (typeof deductionEndStatus === 'number' && [0, 1].includes(deductionEndStatus)) {
          return (
            <Switch
              {...{
                checkedChildren: '完结',
                unCheckedChildren: '未完结',
                checked: !!deductionEndStatus,
                onClick: async (v) => {
                  try {
                    await updateUsingPUT({ id, deductionEndStatus: v ? 1 : 0 });
                    message.success('修改是否抵扣完结成功');
                    action?.reload();
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
      valueType: 'digit',
      fieldProps: {
        precision: 2,
      },
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
      title: '日期',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
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
                console.log({ form, formRef });
                formRef.current?.setFields?.([
                  { name: 'deductionAccountNameSearch', warnings: [] },
                  { name: 'typeId', warnings: [] },
                ]);
                console.log({ value });
                const { typeId, list = [] } = formRef.current?.getFieldsValue();
                console.log({ list });
                if (!typeId) {
                  formRef.current?.setFields([{ name: 'typeId', warnings: ['请先选择类型'] }]);
                }
                if (!value) {
                  formRef.current?.setFields([
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
                          formRef.current?.setFieldValue(
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
                    formRef.current?.setFieldValue(
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

                  formRef.current?.setFields([
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
      render: (v, { list }) => <>{list?.map((item) => item.accountName).join(',')}</>,
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
          valueType: 'group',
          columns: [
            {
              title: '抵扣账户名称',
              dataIndex: 'accountName',
              readonly: true,
              fieldProps: (form, config) => ({
                onBlur: (...args) => {
                  console.log({ args, form, config });
                },
              }),
              // colProps: { span: 12 },
            },
            {
              title: '抵扣金额',
              dataIndex: 'amount',
              valueType: 'digit',
              fieldProps: {
                precision: 2,
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: '请输入抵扣金额',
                  },
                ],
              },
              // colProps: { span: 8 },
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
      ],
      // columns: ,
    },
    // {
    //   valueType:'dependency',
    //   name: ['type'],
    // },

    {
      title: '抵扣金额',
      dataIndex: 'deductionAmount',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
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
      dataIndex: 'updateTime',
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
      transform: ([startTime, endTime]) => ({
        startTime: startTime ? `${startTime} 00:00:00` : startTime,
        endTime: endTime ? `${endTime} 23:59:59` : startTime,
      }),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      hideInSearch: true,
      valueType: 'textarea',
      colProps: { span: 24 },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      // valueType: 'input',
      hideInForm: true,
      // hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      hideInDescriptions: true,
      width: 240,
      render: (_text, record, _i, action) => {
        return [
          <Button
            key="update"
            {...{
              type: 'primary',
              onClick: () => {
                triggerToOpenModal('update', record);
              },
              // @ts-ignore
              disabled: record.status === 0 && !isAdmin,
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
          <PopButton<API.BookkeepUpdateReqVO>
            key="delete"
            {...{
              data: record,
              rowKey: 'id',
              request: deletedUsingDELETE8,
              onSuccess: () => {
                action?.clearSelected?.();
                action?.reload();
              },
            }}
          ></PopButton>,

          // <Button
          //   key="delete"
          //   {...{
          //     type: 'primary',
          //     danger: true,
          //     onClick: async () => {
          //       if (!record.id) return;
          //       try {
          //         await deletedUsingDELETE8({ id: record.id });
          //         message.success('删除成功');
          //         action?.reload();
          //       } catch {}
          //     },
          //   }}
          // >
          //   删除
          // </Button>,
        ];
      },
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const getOptions = async () => {
    setLoading(true);
    try {
      const list = await Promise.all([
        // pageInfoUsingPOST8({ pageNum: 1, pageSize: 100000, accountName: '123' }),

        pageInfoUsingPOST4({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST6({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST5({ pageNum: 1, pageSize: 100000 }),
      ]);
      // 所以我不喜欢数组
      const keyList = ['portId', 'typeId', 'salesmanId'];
      setOptionJson({
        // accountId: list[0]?.data?.list || [],
        typeId: list[1]?.data?.list || [],
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

  const onValuesChange = (changedValues: any, values) => {
    // console.log({ changedValues });
    const [key, value] = Object.entries(changedValues)?.[0] || [];
    console.log({ key, value });
    if (key === 'list') {
      const { list } = values;

      formRef.current?.setFieldsValue({
        deductionAmount: parseFloat(
          // @ts-ignore
          list?.reduce((all, item) => (item.amount || 0) + all, 0) || 0,
        ).toFixed(2),
      });
    }
    if (key === 'accountId') {
      // TODO:
      const { portName, salesmanName, trade, getPoint } = value as API.AccountRespVO;
      // const { accountId: list = [] } = optionJson;
      // const { portName, salesmanName, trade, getPoint } =
      //   // @ts-ignore
      //   list.find((item) => item.id === value) || {};
      // console.log({ portName, salesmanName, optionJson });
      formRef.current?.setFieldsValue({ portName, salesmanName, trade, getPoint });
    }
    // console.log({ key, value, changedValues });
  };

  const onFinish = async (values: API.BookkeepUpdateReqVO) => {
    const { type, record = {}, title } = chosenData || {};
    const ajaxFun = type === 'add' ? addUsingPOST : updateUsingPUT;
    // if (typeof values.accountId === 'object') {
    // }
    const { deductionEndStatus, ...rest } = {
      ...record,
      ...values,
      accountId: values.accountId?.id || values.accountId,
    };
    // @ts-ignore
    await ajaxFun(rest);
    message.success(`${title}成功`);
    setOpen(false);
    actionRef.current?.reload();
  };

  const { triggerToShowBack, BookkeepingModal } = UseModalMultiple<API.BookkeepUpdateReqVO>(
    'bookkeeping',
    actionRef,
  );
  const { columnsState } = useColumnsState('bookkeeping-table');
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
          scroll: { x: 2700 },
          rowSelection: {
            preserveSelectedRowKeys: true,
          },
          formRef: searchFormRef,
          actionRef,
          columnsState: columnsState,
          pagination: {
            defaultPageSize: 10,
            showSizeChanger: true,
          },
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
                  formRef.current?.setFieldValue('createTime', new Date().getTime());
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
          // onRow: ({ deductionEndStatus }) => {
          //   return { style: deductionEndStatus === 0 ? { background: 'gray' } : {} };
          // },
          // bordered: true,
        }}
      ></ProTable>
      <BetaSchemaForm<API.BookkeepUpdateReqVO>
        {...{
          modalProps: {
            width: '80%',
            bodyStyle: {
              height: '60vh',
              overflow: 'scroll',
            },
          },
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
          columns: (id
            ? columns.map((item) =>
                item.dataIndex === 'accountName' && item.hideInTable
                  ? { ...item, hideInForm: false }
                  : item.dataIndex === 'accountId'
                  ? { ...item, hideInForm: true }
                  : { ...item },
              )
            : columns) as ProFormColumnsType<API.BookkeepUpdateReqVO>[],
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
