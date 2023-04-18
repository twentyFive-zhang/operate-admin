import {
  deletedUsingDELETE1,
  addPermissionUsingPOST,
  updatePermissionUsingPUT,
  getAllMenusPermissionUsingGET,
} from '@/services/admin/zuzhimokuaicaidanquanxianguanli';

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

const listToTree: <T extends { id?: string; pid?: string }>(
  arr: T[],
) => (T & { children?: T[] })[] = (arr) => {
  const result = [];
  const map = new Map();
  arr.forEach((item) => {
    map.set(item.id, item);
  });
  for (let item of arr) {
    if (map.has(item.pid)) {
      if (!map.get(item.pid).children) {
        map.get(item.pid).children = [];
      }
      map.get(item.pid).children.push(item);
    } else {
      result.push(item);
    }
  }
  return result;
};

const Permission: React.FC = () => {
  const [treeList, setTreeList] = useState<API.SysPermission[]>([]);
  const request = async (params: API.PermissionPageReqVO & { current?: number }) => {
    // console.Permission({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await getAllMenusPermissionUsingGET({ ...rest, pageNum });
    const list = listToTree<API.SysPermission>(data || []);
    // @ts-ignore
    setTreeList([{ name: '最顶级节点', id: '0', children: list }]);
    return { data: list, success: true };
  };
  const actionRef = useRef<ActionType>();

  const deletePermission = async (id: string) => {
    await deletedUsingDELETE1({ id });
    message.success('删除成功!');
    actionRef.current?.clearSelected?.();
    actionRef.current?.reload();
  };

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ type: 'add' | 'update'; title: string }>({
    type: 'add',
    title: '新增',
  });

  const formRef = useRef<ProFormInstance>();

  const triggerToOpenModal = (type: 'add' | 'update', values?: API.PermissionUpdateReqVO) => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue(values || { id: undefined });
    setModalVisible(true);
    setModalData({
      type,
      title: type === 'add' ? '新增' : '编辑',
    });
  };
  const getColumns = (
    type: 'form' | 'table',
  ): ProColumns<API.SysPermission>[] | ProFormColumnsType<API.SysPermission>[] => {
    const isForm = type === 'form';
    console.log('type');
    // @ts-ignore
    return [
      {
        title: '菜单权限ID',
        dataIndex: 'id',
        hideInSearch: true,
        hideInTable: true,
        formItemProps: {
          noStyle: true,
        },
        renderFormItem: () => <></>,
      },
      // {
      //   title: '父ID',
      //   dataIndex: 'pid',
      //   hideInSearch: true,
      //   hideInTable: true,
      //   formItemProps: {
      //     noStyle: true,
      //   },
      //   renderFormItem: () => <></>,
      // },
      {
        title: '菜单权限名称',
        dataIndex: 'name',
        // width: 160,
        // fixed: 'left',
      },
      {
        title: '类型',
        dataIndex: 'type',
        valueType: 'radio',
        // width: 120,

        fieldProps: {
          optionType: 'button',
          options: [
            // 1:目录;2:菜单;3:按钮
            { label: '目录', value: 1 },
            {
              label: '菜单',
              value: 2,
            },
            { label: '按钮', value: 3 },
          ],
        },
      },
      {
        title: '父节点',
        dataIndex: 'pid',
        valueType: 'treeSelect',
        hideInTable: true,
        fieldProps: {
          options: treeList,
          fieldNames: {
            label: 'name',
            value: 'id',
            children: 'children',
          },
        },
      },
      isForm && {
        valueType: 'dependency',
        name: ['type'],
        columns: ({ type }: { type: number }) => {
          if (type === 1) {
            return [
              // {
              //   title: 'icon',
              //   dataIndex: 'icon',
              // },

              {
                title: '地址',
                dataIndex: 'url',
              },
            ];
          }
          if (type === 2) {
            return [
              {
                title: '是否是外链',
                dataIndex: 'outChain',
                valueType: 'switch',
                transform: (value: boolean) => ({ outChain: value ? 1 : 0 }),
                fieldProps: {
                  checkedChildren: '是',
                  unCheckedChildren: '否',
                },
              },
              {
                title: '地址',
                dataIndex: 'url',
              },
              {
                title: '菜单权限标识',
                dataIndex: 'perms',
              },
            ];
          }
          return [
            {
              title: '地址',
              dataIndex: 'url',
            },
            {
              title: '请求方式',
              dataIndex: 'method',
              valueType: 'select',
              fieldProps: {
                options: ['PUT', 'DELETE', 'POST', 'PUT', 'GET'].map((v) => ({
                  value: v,
                  label: v,
                })),
              },
            },
            {
              title: '菜单权限标识',
              dataIndex: 'perms',
            },
            {
              title: '菜单权限编码',
              dataIndex: 'code',
            },
          ];
        },
      },
      ...(!isForm
        ? [
            // {
            //   title: 'icon',
            //   dataIndex: 'icon',
            // },
            {
              title: '地址',
              dataIndex: 'url',
            },
            {
              title: '请求方式',
              dataIndex: 'method',
              valueType: 'select',
              fieldProps: {
                options: ['PUT', 'DELETE', 'POST', 'PUT', 'GET'].map((v) => ({
                  value: v,
                  label: v,
                })),
              },
            },
            {
              title: '菜单权限标识',
              dataIndex: 'perms',
            },
            {
              title: '菜单权限编码',
              dataIndex: 'code',
            },
          ]
        : []),

      {
        title: '排序',
        dataIndex: 'orderNum',
        valueType: 'digit',
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        fieldProps: {
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
      {
        title: '操作',
        valueType: 'option',
        dataIndex: 'option',
        // width: 160,
        fixed: 'right',
        //@ts-ignore
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
                if (id) deletePermission(id);
              },
            }}
          >
            删除
          </Button>,
        ],
      },
    ].filter((item) => !!item);
  };

  // const columns: (ProColumns<API.SysPermission> & ProFormColumnsType<API.SysPermission>)[] = [];

  const onFinish = async (values: API.PermissionUpdateReqVO) => {
    const { type, title } = modalData;
    const ajaxFun = type === 'add' ? addPermissionUsingPOST : updatePermissionUsingPUT;
    await ajaxFun(values);
    message.success(`${title}菜单权限成功`);
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
            { breadcrumbName: '菜单权限管理', path: '/sys/port' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysPermission>
        {...{
          actionRef,
          headerTitle: '菜单权限管理',
          search: false,
          columns: getColumns('table') as ProColumns<API.SysPermission>[],
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
          pagination: false,
          expandable: {
            defaultExpandAllRows: true,
          },
          scroll: {
            // y: 600,
            x: 1600,
          },
        }}
      ></ProTable>
      <BetaSchemaForm<API.PermissionUpdateReqVO>
        {...{
          formRef,
          layoutType: 'ModalForm',
          columns: getColumns('form') as ProFormColumnsType<API.SysPermission>[],
          open: modalVisible,
          onOpenChange: setModalVisible,
          title: `${modalData.title}菜单权限`,
          layout: 'horizontal',
          onFinish,
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }}
      ></BetaSchemaForm>
    </PageContainer>
  );
};

export default Permission;
