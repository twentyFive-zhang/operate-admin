import {
  PageContainer,
  ProTable,
  // type ProSchema,
  type ProFormColumnsType,
  type ProColumns,
  type ProFormInstance,
  BetaSchemaForm,
  type ActionType,
  ProDescriptions,
  type ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import {
  pageInfoUsingPOST10,
  batchExportUsingPOST1,
  detailInfoUsingGET9,
  updateUsingPUT1,
  addUsingPOST1,
  getAccountListUsingPOST,
  importDrawbackUsingPOST,
} from '@/services/admin/yewumokuaituikuanguanli';
import { Button, Modal, Space, message, Upload } from 'antd';
import { UploadOutlined, ExportOutlined } from '@ant-design/icons';
import { pageInfoUsingPOST4 } from '@/services/admin/xitongmokuaiduankouguanli';
import { pageInfoUsingPOST6 } from '@/services/admin/xitongmokuaileixingguanli';
import { pageInfoUsingPOST5 } from '@/services/admin/xitongmokuaiyewuyuanguanli';
import { UseModalMultiple } from './Bookkeeping';
// import { SearchOutlined } from '@ant-design/icons';

const ImportFile: React.FC<{ onCbk: () => void }> = ({ onCbk }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const customRequest = async ({ file }) => {
    // console.log({ file });
    setLoading(true);
    try {
      await importDrawbackUsingPOST({}, file as File, { timeout: 3000000, getResponse: true });
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

const ExportButton: React.FC<{ onBefore: () => API.DrawbackPageReqVO }> = ({ onBefore }) => {
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
      const res = await batchExportUsingPOST1(data, {
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

const AccountListModal: React.FC<{
  open: boolean;
  onOpenChange: (s: boolean) => void;
  params: { accountName: string };
  onChange: (p: API.AccountNameListVo) => void;
}> = ({ open, onOpenChange, params, onChange }) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<API.AccountNameListVo[]>([]);
  const formRef = useRef<ProFormInstance>();

  // useEffect(() => {
  //   console.log({ params });
  //   if (!params.accountName) {
  //     formRef.current?.setFieldsValue(params);
  //     actionRef.current?.reload();
  //   }
  // }, [params.accountName]);

  useEffect(() => {
    if (!open) {
      // formRef.current?.resetFields();
    } else {
      console.log(params.accountName, formRef.current?.getFieldValue('accountName'));
      if (params.accountName !== formRef.current?.getFieldValue('accountName')) {
        actionRef.current?.reset?.();
        formRef.current?.setFieldsValue(params);
        actionRef.current?.reload?.();
      }
    }
  }, [open]);

  return (
    <Modal
      {...{
        open,
        onOpenChange,
        width: '80%',
        title: '充值账户列表',
        onCancel: () => {
          onOpenChange(false);
        },
        okButtonProps: {
          disabled: !selectedRowKeys?.length,
        },
        onOk: () => {
          if (selectedRows[0]) {
            onChange(selectedRows[0]);
          }
        },
      }}
    >
      <ProTable<API.AccountNameListVo>
        {...{
          pagination: false,
          options: false,
          actionRef,
          formRef,
          rowKey: ({ typeId, accountId }) => `${typeId}-${accountId}`,
          columns: [
            {
              title: '账户名称',
              dataIndex: 'accountName',
              formItemProps: {
                rules: [{ required: true, message: '请先输入账户名称进行查询' }],
              },
            },
            {
              title: '渠道点位',
              dataIndex: 'canalPoint',
              hideInSearch: true,
            },
            {
              title: '百度币',
              dataIndex: 'currency',
              hideInSearch: true,
            },
            {
              title: '拿到点位',
              dataIndex: 'getPoint',
              hideInSearch: true,
            },
            {
              title: '是否抵扣',
              dataIndex: 'deductionStatus',
              hideInSearch: true,
              valueType: 'select',
              render: (_dom, { deductionStatus }) =>
                deductionStatus === 1 ? <span {...{ style: { color: 'red' } }}>是</span> : <>否</>,
              fieldProps: {
                options: [
                  { value: 1, label: '是' },
                  { value: 0, label: '否' },
                ],
              },
            },
            {
              title: '是否有退款',
              dataIndex: 'drawbackStatus',
              hideInSearch: true,
              valueType: 'select',
              fieldProps: {
                options: [
                  { value: 1, label: '是' },
                  { value: 0, label: '否' },
                ],
              },
            },
            {
              dataIndex: 'portName',
              title: '端口名称',
              hideInSearch: true,
            },
            {
              title: '业务员名称',
              dataIndex: 'salesmanName',
              hideInSearch: true,
            },
            {
              dataIndex: 'trade',
              title: '行业',
              hideInSearch: true,
            },
            {
              title: '类型名称',
              dataIndex: 'typeName',
              hideInSearch: true,
            },
          ],
          // params,
          request: async (p1) => {
            // console.log({ p });
            const p = { ...params, ...p1 };
            if (!p.accountName) {
              setSelectedRowKeys([]);
              setSelectedRows([]);
              return { data: [], success: true };
            }
            const { data } = await getAccountListUsingPOST(p as API.getAccountListUsingPOSTParams);
            if (
              !data?.filter((item) => selectedRowKeys.includes(`${item.typeId}-${item.accountId}`))
                ?.length
            ) {
              setSelectedRowKeys([]);
              setSelectedRows([]);
            }
            return { data, success: true };
          },
          // alwaysShowAlert: false,
          tableAlertRender: false,
          rowSelection: {
            alwaysShowAlert: false,
            type: 'radio',
            selectedRowKeys,
          },
          onRow: (record: API.AccountNameListVo) => {
            return {
              onClick: () => {
                if (record.typeId && record.accountId) {
                  const isExist = selectedRowKeys.includes(`${record.typeId}-${record.accountId}`);
                  setSelectedRows(isExist ? [] : [record]);
                  setSelectedRowKeys(isExist ? [] : [`${record.typeId}-${record.accountId}`]);
                }
              },
            };
          },
        }}
      ></ProTable>
    </Modal>
  );
};

const Drawback: React.FC = () => {
  const searchFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();

  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState<boolean>(false);

  const [chosenData, setChosenData] = useState<{
    type: 'add' | 'update' | 'detail';
    title: string;
    record: API.AccountRespVO;
  }>();

  // const [optionJson, setOptionJson] = useState<{ [key: string]: API.AccountRespVO[] }>({
  //   accountId: [],
  // });
  const [id, setId] = useState<number>();
  const isEdit = useRef<boolean>(false);

  const triggerToOpenModal = async (
    type: 'add' | 'update' | 'detail',
    record?: API.BookkeepRespVO,
  ) => {
    isEdit.current = type === 'update';
    setOpen(true);
    setChosenData({
      type,
      title: { add: '新增退款', update: '编辑退款', detail: '退款详情' }[type],
      record: record || {},
    });
    // formRef.current?.resetFields();
    setId(record?.id);

    // if (record?.id) {
    //   const { data } = await detailInfoUsingGET9({ id: record.id });
    //   formRef.current?.setFieldsValue(data);
    // }

    // if(record?.id)
  };

  const detailRequest = async (params: { id?: number }) => {
    console.log({ params });
    if (!params?.id) {
      return { data: {}, success: true };
    }
    const { data } = await detailInfoUsingGET9(params as { id: number });
    formRef.current?.setFieldsValue(data || {});
    return { data: data || {}, success: true };
  };

  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const [accountParams, setAccountParams] = useState<{ accountName: string }>({ accountName: '' });

  const triggerToShowAccountListModal = () => {
    setAccountOpen(true);
  };

  const [columns, setColumns] = useState<ProFormColumnsType<API.DrawbackRespVO>[]>([
    {
      title: '退款单号',
      dataIndex: 'drawbackNumber',
      hideInForm: true,
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      hideInForm: true,
    },
    {
      title: '账户ID',
      dataIndex: 'accountId',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      colProps: { span: 0 },
    },
    {
      title: '账户名称',
      dataIndex: 'accountName',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      formItemProps: {
        rules: [{ required: true, message: '请选择账户' }],
      },
      renderFormItem: (schema, { value, record }, form) => {
        // console.log(form, record, chosenData, form.getFieldValue('id'));
        // console.log(JSON.stringify(form));
        //@ts-ignore
        const ids = form?.formRef && form?.getFieldValue('id');
        // console.log({ id, chosenData }, form?.getFieldValue?.('id'));
        console.log({ id, record, ids, value, chosenData, isEdit: isEdit.current });

        return (
          <Space>
            <div>已选账户:【{value || '未选择账户'}】</div>
            {!isEdit.current && (
              <Button
                {...{
                  onClick: () => {
                    // console.log({ value });
                    setAccountParams({ accountName: value });
                    triggerToShowAccountListModal();
                  },
                }}
              >
                选择账户
              </Button>
            )}
          </Space>
        );
      },
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
    },
    {
      title: '退款时间',
      dataIndex: 'drawbackTimeSelect',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      valueType: 'dateRange',
      transform: ([startDrawbackTime, endDrawbackTime]) => ({
        startDrawbackTime: startDrawbackTime ? `${startDrawbackTime} 00:00:00` : startDrawbackTime,
        endDrawbackTime: endDrawbackTime ? `${endDrawbackTime} 23:59:59` : endDrawbackTime,
      }),
    },
    {
      title: '退款时间',
      dataIndex: 'drawbackTime',
      valueType: 'date',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '对外结算',
      dataIndex: 'externalSettlement',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      valueType: 'dateRange',
      transform: ([startTime, endTime]) => ({
        startTime: startTime ? `${startTime} 00:00:00` : startTime,
        endTime: endTime ? `${endTime} 23:59:59` : startTime,
      }),
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
      title: '端口',
      dataIndex: 'portName',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '是否重复退款',
      dataIndex: 'repeatStatus',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '否', value: 0 },
          { label: '是', value: 1 },
        ],
      },
      hideInForm: true,
    },
    {
      title: '行业',
      dataIndex: 'trade',
      hideInSearch: true,
      hideInTable: true,
      hideInDescriptions: true,
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '行业',
      dataIndex: 'trade',
      hideInForm: true,
      // transform: (trade) => ({ trade }),
    },
    {
      title: '类型',
      dataIndex: 'typeId',
      hideInTable: true,
      hideInForm: true,
      hideInDescriptions: true,
      valueType: 'select',
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
      title: '类型',
      dataIndex: 'typeId',
      hideInTable: true,
      hideInSearch: true,
      hideInDescriptions: true,
      colProps: { span: 0 },
    },
    {
      title: '类型',
      dataIndex: 'typeName',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
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
      title: '业务员',
      dataIndex: 'salesmanName',
      hideInSearch: true,
      fieldProps: {
        disabled: true,
      },
    },
    {
      title: '百度币',
      dataIndex: 'currency',
      hideInSearch: true,
    },
    {
      title: '拿到点位',
      dataIndex: 'getPoint',
      hideInSearch: true,
    },
    { title: '渠道点位', dataIndex: 'canalPoint', hideInSearch: true },
    {
      title: '退款金额',
      dataIndex: 'drawbackAmount',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '计划盈亏',
      dataIndex: 'profit',
      hideInForm: true,
      hideInSearch: true,
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
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'textarea',
      hideInSearch: true,
      colProps: { span: 24 },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInDescriptions: true,
      //@ts-ignore
      fixed: 'right',
      render: (_text, record, _i, action) => {
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
          <Button key="delete" {...{ type: 'primary', danger: true, onClick: () => {} }}>
            删除
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
        // pageInfoUsingPOST8({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST4({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST6({ pageNum: 1, pageSize: 100000 }),
        pageInfoUsingPOST5({ pageNum: 1, pageSize: 100000 }),
      ]);
      // 所以我不喜欢数组
      const keyList = ['portId', 'typeId', 'salesmanId'];
      // setOptionJson({
      //   accountId: list[0]?.data?.list || [],
      // });
      // console.log({ optionJson });
      list[0].data?.list?.map?.((item) => ({
        ...item,
        label: `${item.portName}/${item.portNumber}`,
      }));
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

  const onFinish = async (values: API.DrawbackUpdateReqVO) => {
    const { type, record = {}, title } = chosenData || {};
    const ajaxFun = type === 'add' ? addUsingPOST1 : updateUsingPUT1;
    await ajaxFun({ ...record, ...values });
    message.success(`${title}成功`);
    setOpen(false);
    actionRef.current?.reload();
    return true;
  };

  const { triggerToShowBack, DrawerBackModal } = UseModalMultiple<API.DrawbackRespVO>(
    'drawerBack',
    actionRef,
  );

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '业务', path: '/yw' },
            { breadcrumbName: '退款管理', path: '/yw/drawback' },
          ],
        },
        title: '',
        loading,
      }}
    >
      <DrawerBackModal></DrawerBackModal>
      <ProTable<API.DrawbackRespVO>
        {...{
          scroll: { x: 2600 },
          rowKey: 'id',
          headerTitle: '退款列表',
          formRef: searchFormRef,
          actionRef,
          rowSelection: {},
          // loading,
          columns: columns as ProColumns<API.DrawbackRespVO>[],
          request: async (params: API.BookkeepPageReqVO & { current?: number }) => {
            console.log(123);
            const { current: pageNum, ...rest } = params;
            const { data } = await pageInfoUsingPOST10({ ...rest, pageNum });
            return { data: data?.list || [], total: data?.totalRows || 0 };
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
              批量退款
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
            // <Button
            //   key="export"
            //   {...{
            //     type: 'primary',
            //     ghost: true,
            //     onClick: async () => {
            //       const data = searchFormRef.current?.getFieldsValue();
            //       await batchExportUsingPOST1(data);
            //     },
            //   }}
            // >
            //   导出
            // </Button>,
            <Button
              key="add"
              {...{
                type: 'primary',
                onClick: () => {
                  formRef.current?.resetFields();
                  triggerToOpenModal('add');
                },
              }}
            >
              新增
            </Button>,
          ],
        }}
      ></ProTable>

      <BetaSchemaForm<API.DrawbackUpdateReqVO>
        {...{
          modalProps: { width: '80%' },
          layout: chosenData?.type === 'detail' ? 'horizontal' : 'vertical',
          grid: true,
          rowProps: { gutter: 20 },
          title: chosenData?.title,
          colProps: { xs: 24, md: 12, xl: 8, xxl: 8 },
          open: open && chosenData?.type !== 'detail',
          // readonly: chosenData?.type === 'detail',
          onOpenChange: (status: boolean) => {
            // console.log({ status, open });
            if (!status) {
              setAccountParams({ accountName: '' });
            }
            if (open !== status) setOpen(status);
          },
          formRef,
          layoutType: 'ModalForm',
          columns: columns as ProFormColumnsType<API.DrawbackUpdateReqVO>[],
          // onValuesChange,
          onFinish,
          name: 'ModalForm',
          params: { id },
          request: detailRequest,
        }}
      ></BetaSchemaForm>
      <AccountListModal
        {...{
          open: accountOpen,
          onOpenChange: setAccountOpen,
          params: accountParams,
          onChange: (r) => {
            formRef.current?.setFieldsValue(r);
            setAccountParams({ accountName: r.accountName || '' });
            setAccountOpen(false);
          },
        }}
      ></AccountListModal>
      <Modal
        {...{
          open: open && chosenData?.type === 'detail',
          width: '80%',
          footer: null,
          title: '退款详情',
          onCancel: () => {
            setOpen(false);
          },
        }}
      >
        <ProDescriptions
          {...{
            column: 2,
            bordered: true,
            size: 'middle',
            params: { id },
            request: detailRequest,
            columns: columns as ProDescriptionsItemProps<API.DrawbackUpdateReqVO>[],
          }}
        ></ProDescriptions>
      </Modal>
    </PageContainer>
  );
};

export default Drawback;
