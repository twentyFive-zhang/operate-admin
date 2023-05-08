import { getTreeUsingGET } from '@/services/admin/zuzhimokuaijigouguanli';
import {
  pageInfoUsingPOST7,
  deletedUserUsingDELETE,
  updateUserInfoUsingPUT,
  addUserUsingPOST,
  getUserOwnRoleUsingGET,
  setUserOwnRoleUsingPUT,
} from '@/services/admin/zuzhimokuaiyonghuguanli';
import {
  PageContainer,
  ProTable,
  ProColumns,
  BetaSchemaForm,
  type ProCoreActionType,
  type ProFormColumnsType,
  type ProFormInstance,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, Popconfirm, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

/**  编辑新增弹框 */
const UserModal: React.FC<{
  open: boolean;
  onOpenChange: (s: boolean, isToReload?: boolean) => void;
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  chosenData: API.SysUser;
}> = ({ open, onOpenChange, formRef, chosenData }) => {
  const columns: ProFormColumnsType<API.UserUpdateReqVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      renderFormItem: () => <></>,
      formItemProps: {
        noStyle: true,
      },
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '真实名称',
      dataIndex: 'realName',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      valueType: 'select',
      //1.男 2.女
      // valueEnum: {
      //   1: {
      //     text: '男',
      //   },
      //   2: {
      //     text: '女',
      //   },
      // },
      fieldProps: {
        options: [
          { label: '男', value: 1 },
          {
            label: '女',
            value: 2,
          },
        ],
      },
    },
    {
      title: '所属公司',
      dataIndex: 'deptId',
      valueType: 'treeSelect',
      request: async () => {
        const { data } = await getTreeUsingGET({});
        return data || [];
      },

      fieldProps: {
        treeDefaultExpandAll: true,
        // blockNode: true,
        // checkable: true,
        // checkStrictly: true,
        // onCheck: (...args) => {
        //   console.log({ args });
        // },
        fieldNames: {
          title: 'title',
          value: 'id',
          children: 'children',
        },
      },
    },

    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'switch',
      transform: (value) => ({ status: value ? 1 : 0 }),
      fieldProps: {
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
      },
    },
  ];

  const onFinish = async (values: API.UserUpdateReqVO) => {
    const ajaxFun = values.id ? updateUserInfoUsingPUT : addUserUsingPOST;
    // @ts-ignore
    await ajaxFun(values);
    message.success(`${values.id ? '编辑' : '新增'}用户成功`);
    onOpenChange(false, true);
  };

  return (
    <BetaSchemaForm
      {...{
        layout: 'horizontal',
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        title: `${chosenData.id ? '编辑' : '新增'}用户`,
        layoutType: 'ModalForm',
        open,
        onOpenChange: (status) => {
          onOpenChange(status);
        },
        columns,
        formRef,
        onFinish,
      }}
    ></BetaSchemaForm>
  );
};
/** 绑定角色弹框 */
const UserRoleModal: React.FC<{
  userId?: string;
  open: boolean;
  onOpenChange: (s: boolean, isToReload?: boolean) => void;
}> = ({ userId, open, onOpenChange }) => {
  const formRef = useRef<ProFormInstance>();
  const [options, setOptions] = useState<API.SysRole[]>([]);

  const getOptions = async () => {
    if (userId) {
      const { data } = await getUserOwnRoleUsingGET({ userId });
      formRef.current?.resetFields();
      formRef.current?.setFieldsValue({ ids: data?.ownRoles || [] });
      setOptions((data?.allRole || []).map((item) => ({ ...item, disabled: item.status === 0 })));
    }
  };

  useEffect(() => {
    if (userId) getOptions();
  }, [userId]);

  const onFinish = async ({ ids }: { ids: string[] }) => {
    if (userId) {
      await setUserOwnRoleUsingPUT({ userId }, ids);
      message.success('绑定角色成功');
      onOpenChange(false, true);
    }
  };

  return (
    <BetaSchemaForm
      {...{
        layoutType: 'ModalForm',
        columns: [
          {
            title: 'ID',
            dataIndex: 'userId',
            renderFormItem: () => <></>,
            formItemProps: {
              noStyle: true,
            },
          },
          {
            title: '角色',
            dataIndex: 'ids',
            valueType: 'select',
            fieldProps: {
              options,
              fieldNames: {
                label: 'name',
                value: 'id',
              },
              mode: 'multiple',
            },
            formItemProps: {
              rules: [{ required: true, message: '请选择角色' }],
            },
          },
        ],
        formRef,
        open,
        onOpenChange: (status) => {
          onOpenChange(status);
        },
        onFinish,
        title: '绑定角色',
        layout: 'horizontal',
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }}
    ></BetaSchemaForm>
  );
};

const User: React.FC = () => {
  const deleteData = async (ids: string[], action?: ProCoreActionType<object>) => {
    await deletedUserUsingDELETE(ids);
    message.success('删除成功');
    action?.reload();
    action?.clearSelected?.();
  };

  const [open, setOpen] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const [chosenData, setChosenData] = useState<API.SysUser>({});
  const actionRef = useRef<ActionType>();

  const onOpenChange = (status: boolean, isToReload?: boolean) => {
    setOpen(status);
    console.log({ isToReload });
    if (isToReload) actionRef.current?.reload();
  };

  const [userId, setUserId] = useState<string>();
  const [roleOpen, setRoleOpen] = useState<boolean>(false);

  const onRoleOpenChange = (status: boolean, isToReload?: boolean) => {
    setRoleOpen(status);
    if (isToReload) actionRef.current?.reload();
  };

  const columns: ProColumns<API.SysUser>[] = [
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '所属公司',
      dataIndex: 'deptName',
      hideInSearch: true,
    },
    {
      title: '真实名称',
      dataIndex: 'realName',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      //1.男 2.女
      // valueEnum: {
      //   1: {
      //     text: '男',
      //   },
      //   2: {
      //     text: '女',
      //   },
      // },
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '男', value: 1 },
          {
            label: '女',
            value: 2,
          },
        ],
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime1',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: ([startTime, endTime]) => ({
          startTime: startTime ? `${startTime} 00:00:00` : startTime,
          endTime: endTime ? `${endTime} 23:59:59` : startTime,
        }),
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   //1.正常 2.锁定
    //   valueEnum: {
    //     1: {
    //       text: '启用',
    //     },
    //     2: {
    //       text: '禁用',
    //     },
    //   },
    // },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      // hideInForm: true,
      fieldProps: {
        options: [
          { value: 1, label: '启用' },
          { value: 0, label: '禁用' },
        ],
      },
    },
    {
      title: '注册来源',
      dataIndex: 'createWhere',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        //1.web 2.android 3.ios
        1: {
          text: 'web',
        },
        2: {
          text: 'android',
        },
        3: {
          text: 'ios',
        },
      },
      // valueSchema: {}
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (_, record, _index, action) => [
        <Button
          key="update"
          {...{
            type: 'primary',
            onClick: () => {
              setChosenData({ ...record, password: undefined });
              formRef.current?.resetFields();
              formRef.current?.setFieldsValue({ ...record, password: undefined });
              onOpenChange(true);
            },
          }}
        >
          编辑
        </Button>,
        <Button
          key="role"
          {...{
            type: 'dashed',
            onClick: () => {
              setUserId(record.id);
              onRoleOpenChange(true);
            },
          }}
        >
          绑定角色
        </Button>,
        <Popconfirm
          key="delete"
          {...{
            title: '是否确认删除数据?',
            onConfirm: async () => {
              await deleteData([record.id as string], action);
            },
          }}
        >
          <Button {...{ type: 'primary', danger: true }}>删除</Button>
        </Popconfirm>,
      ],
    },
  ];

  const request = async (params: API.UserPageReqVO & { current?: number }) => {
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST7({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '系统', path: '/sys' },
            { breadcrumbName: '用户管理', path: '/sys/user' },
          ],
        },
        title: '',
      }}
    >
      <UserRoleModal
        {...{ open: roleOpen, onOpenChange: onRoleOpenChange, userId }}
      ></UserRoleModal>
      <UserModal {...{ open, onOpenChange, formRef, chosenData }}></UserModal>
      <ProTable<API.SysUser>
        {...{
          actionRef,
          headerTitle: '用户列表',
          columns,
          request,
          rowKey: 'id',
          toolBarRender: (action, { selectedRowKeys }) => [
            !!selectedRowKeys?.length && (
              <Popconfirm
                key="delete"
                {...{
                  title: '是否确认删除数据?',
                  onConfirm: async () => {
                    await deleteData(selectedRowKeys as string[], action);
                  },
                }}
              >
                <Button {...{ type: 'primary', danger: true }}>批量删除</Button>
              </Popconfirm>
            ),
            <Button
              key="add"
              {...{
                type: 'primary',
                onClick: () => {
                  setChosenData({});
                  formRef.current?.resetFields();
                  onOpenChange(true);
                },
              }}
            >
              新增
            </Button>,
          ],
          rowSelection: {},
          bordered: true,
          pagination: {
            defaultPageSize: 10,
            showSizeChanger: true,
          },
        }}
      ></ProTable>
    </PageContainer>
  );
};

export default User;
