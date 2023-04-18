import { ProTable, PageContainer, ProColumns } from '@ant-design/pro-components';
import { pageInfoUsingPOST, deletedUsingDELETE } from '@/services/admin/zuzhimokuaijigouguanli';
import { Button, Popconfirm, message } from 'antd';
import { history } from '@umijs/max';

const Dept: React.FC = () => {
  const columns: ProColumns<API.SysDept>[] = [
    {
      title: '部门ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '部门编码',
      dataIndex: 'deptNo',
      hideInSearch: true,
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      hideInTable: true,
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '上级部门名称',
      dataIndex: 'pidName',
      hideInSearch: true,
    },
    {
      title: '层级关系编码',
      dataIndex: 'relationCode',
      hideInSearch: true,
    },
    {
      title: '部门经理',
      dataIndex: 'managerName',
      hideInSearch: true,
    },
    {
      title: '部门经理联系电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (_text, { id }, _index, action) => [
        <Button
          key="update"
          {...{
            type: 'primary',
            onClick: () => {
              history.push(`/sys/dept/edit/${id}`);
            },
          }}
        >
          编辑
        </Button>,
        !!id && (
          <Popconfirm
            key="delete"
            {...{
              title: '是否确认删除该条数据',
              onConfirm: async () => {
                await deletedUsingDELETE({ id });
                message.success('删除成功');
                action?.reload();
              },
            }}
          >
            <Button {...{ type: 'primary', danger: true }}>删除</Button>
          </Popconfirm>
        ),
      ],
    },
  ];

  const request = async (params: API.DeptPageReqVO & { current?: number }) => {
    // console.log({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '系统', path: '/sys' },
            { breadcrumbName: '部门管理', path: '/sys/dept' },
          ],
        },
        title: '',
      }}
    >
      <ProTable
        {...{
          headerTitle: '部门列表',
          columns,
          request,
          rowKey: 'id',
          bordered: true,
          // search: false,
          toolbar: {
            actions: [
              <Button
                key="add"
                {...{
                  type: 'primary',
                  onClick: () => {
                    history.push('/sys/dept/add');
                  },
                }}
              >
                新增
              </Button>,
            ],
          },
        }}
      ></ProTable>
    </PageContainer>
  );
};

export default Dept;
