import { operationRolePermissionUsingPOST } from '@/services/admin/zuzhiguanlijiaosehecaidanguanlianjiekou';
import {
  pageInfoUsingPOST2,
  deletedUsingDELETE2,
  addRoleUsingPOST,
  updateDeptUsingPUT1,
  detailInfoUsingGET2,
} from '@/services/admin/zuzhimokuaijiaoseguanli';

import {
  PageContainer,
  ProTable,
  type ProSchema,
  type ProColumns,
  type ActionType,
  BetaSchemaForm,
  type ProFormColumnsType,
  type ProFormInstance,
  ProConfigProvider,
} from '@ant-design/pro-components';
import { Button, Tree, message } from 'antd';
import { useRef, useState } from 'react';

// function flatten {
//   return;
// }
const flatten: <T>(arr: (T & { children?: T[] })[]) => T[] = (arr) =>
  arr.reduce((prev, cur) => {
    const { children = [], ...others } = cur;
    //@ts-ignore
    return prev.concat([{ ...others }], flatten(children));
  }, []);

const Role: React.FC = () => {
  const bindFormRef = useRef<ProFormInstance>();

  const [permissionOptions, setPermissionOptions] =
    useState<(API.PermissionRespNode & { children?: API.PermissionRespNode[] })[]>();

  const request = async (params: API.RolePageReqVO & { current?: number }) => {
    // console.Role({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST2({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  const deleteRole = async (id: string) => {
    await deletedUsingDELETE2({ id });
    message.success('删除成功!');
    actionRef.current?.clearSelected?.();
    actionRef.current?.reload();
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update' | 'bind'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  // const [roleId, setRoleId] = useState<string>();

  const triggerToOpenModal = async (
    type: 'add' | 'update' | 'bind',
    values?: API.RoleUpdateReqVO,
  ) => {
    if (type !== 'bind') {
      formRef.current?.resetFields();
      formRef.current?.setFieldsValue(values || { id: undefined });
    } else {
      // setRoleId(values?.id);
      if (values?.id) {
        try {
          const { data } = await detailInfoUsingGET2({ id: values?.id });
          setPermissionOptions(data?.permissionRespNodes || []);
          const permissionIds = data?.permissionRespNodes?.length
            ? flatten<API.PermissionRespNode>(data?.permissionRespNodes)
                .filter((item) => item.checked)
                .map((item) => item.id)
            : [];
          bindFormRef.current?.resetFields();
          bindFormRef.current?.setFieldsValue({ ...data, permissionIds });
        } catch {
          setPermissionOptions([]);
          bindFormRef.current?.resetFields();
        }
      }
    }
    setModalVisible(true);

    // if (values?.id) detailInfoUsingGET2({ id: values.id });
    setModalData({
      type,
      title: {
        add: '新增角色',
        update: '绑定角色',
        bind: '绑定菜单',
      }[type],
    });
  };

  const columns: (ProSchema<API.SysRole> & ProFormColumnsType<API.SysRole>)[] = [
    {
      title: '角色ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {
        noStyle: true,
      },
      renderFormItem: () => <></>,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime1',
      valueType: 'dateRange',
      hideInTable: true,
      hideInForm: true,
      transform: ([startTime, endTime]) => ({
        startTime: startTime ? `${startTime} 00:00:00` : startTime,
        endTime: endTime ? `${endTime} 23:59:59` : startTime,
      }),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '启用' },
          { value: 0, label: '禁用' },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
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
          key="bind"
          {...{
            onClick: () => {
              triggerToOpenModal('bind', record);
            },
          }}
        >
          绑定菜单
        </Button>,
        <Button
          key="delete"
          {...{
            type: 'primary',
            danger: true,
            onClick: () => {
              const { id } = record;
              if (id) deleteRole(id);
            },
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  const onFinish = async (values: API.RoleUpdateReqVO) => {
    console.log({ values });
    const { type, title } = modalData;
    const ajaxFun = type === 'add' ? addRoleUsingPOST : updateDeptUsingPUT1;
    await ajaxFun(values);
    message.success(`${title}成功`);
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
            { breadcrumbName: '角色管理', path: '/sys/port' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysRole>
        {...{
          actionRef,
          headerTitle: '角色管理',
          // search: false,
          columns: columns as ProColumns<API.SysRole>[],
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
      <BetaSchemaForm<API.RoleUpdateReqVO>
        {...{
          formRef,
          layoutType: 'ModalForm',
          columns: columns as ProFormColumnsType<API.RoleUpdateReqVO>[],
          open: modalVisible && modalData.type !== 'bind',
          onOpenChange: setModalVisible,
          title: `${modalData.title}`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }}
      ></BetaSchemaForm>
      <ProConfigProvider
        {...{
          valueTypeMap: {
            tree: {
              renderFormItem: (text, { fieldProps: { onChange }, ...rest }) => {
                console.log({ text, rest });
                return (
                  // @ts-ignore
                  <Tree
                    {...{
                      checkable: true,
                      fieldNames: { key: 'id', title: 'title', children: 'children' },
                      treeData: permissionOptions || [],
                      checkedKeys: text || [],
                      onCheck: (selectedKeys) => {
                        // console.log({ selectedKeys });
                        onChange?.(selectedKeys);
                      },
                    }}
                  ></Tree>
                );
              },
            },
          },
        }}
      >
        <BetaSchemaForm<API.SysRole, 'tree'>
          {...{
            layoutType: 'ModalForm',
            open: modalVisible && modalData.type === 'bind',
            onOpenChange: setModalVisible,
            title: modalData.title,
            layout: 'horizontal',
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            // params: { id: roleId },
            formRef: bindFormRef,
            columns: [
              {
                title: '角色名称',
                dataIndex: 'name',
                readonly: true,
              },
              {
                title: '角色ID',
                dataIndex: 'id',
                formItemProps: {
                  noStyle: true,
                },
                renderFormItem: () => <></>,
              },
              {
                title: '绑定菜单',
                dataIndex: 'permissionIds',
                valueType: 'tree',
                fieldProps: {},
              },
            ],
            // request: async (params) => {
            //   const { id } = params;
            //   if (!id) return {};
            //   const { data } = await detailInfoUsingGET2({ id });
            //   setPermissionOptions(data?.permissionRespNodes || []);
            //   const permissionIds = data?.permissionRespNodes?.length
            //     ? flatten<API.PermissionRespNode>(data?.permissionRespNodes)
            //         .filter((item) => item.checked)
            //         .map((item) => item.id)
            //     : [];
            //   // bindFormRef.current?.setFieldsValue({ permissionIds });
            //   // console.log({ permissionIds });
            //   return { ...data, permissionIds } || {};
            // },
            onFinish: async (data) => {
              const { id: roleId, ...rest } = data;
              await operationRolePermissionUsingPOST({ ...rest, roleId });
              message.success('绑定成功');
              return true;
            },
          }}
        ></BetaSchemaForm>
      </ProConfigProvider>
    </PageContainer>
  );
};

export default Role;
