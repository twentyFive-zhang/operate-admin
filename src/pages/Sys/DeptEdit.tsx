import { BetaSchemaForm, PageContainer, type ProFormColumnsType } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, Card, Col, Row, Space, message } from 'antd';
import {
  getTreeUsingGET,
  detailInfoUsingGET,
  updateDeptUsingPUT,
  addDeptUsingPOST,
} from '@/services/admin/zuzhimokuaijigouguanli';

const DeptEdit: React.FC = () => {
  const params = useParams();
  const columns: ProFormColumnsType<API.DeptUpdateReqVO>[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '所属公司',
      dataIndex: 'pid',
      valueType: 'treeSelect',
      request: async () => {
        const { data } = await getTreeUsingGET({});
        return data || [];
      },

      fieldProps: {
        treeDefaultExpandAll: true,
        fieldNames: {
          title: 'title',
          value: 'id',
          children: 'children',
        },
      },
    },
    {
      title: '部门经理',
      dataIndex: 'managerName',
    },
    {
      title: '部门经理联系电话',
      dataIndex: 'phone',
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

  const onFinish = async (values: API.DeptUpdateReqVO) => {
    const ajaxFun = params.id ? updateDeptUsingPUT : addDeptUsingPOST;
    await ajaxFun({ ...values, ...params });
    message.success(`${params.id ? '编辑' : '新增'}成功`);
    history.back();
  };

  return (
    <PageContainer
      {...{
        header: {
          title: '',
          breadcrumb: {
            routes: [
              { breadcrumbName: '系统', path: '/sys' },
              { breadcrumbName: '部门管理', path: '/sys/dept' },
              { breadcrumbName: '新增部门', path: '/sys/dept/add' },
            ],
          },
        },
      }}
    >
      <Card
        {...{
          title: `${params.id ? '编辑' : '新增'}部门`,
          extra: (
            <Button
              {...{
                type: 'default',
                onClick: () => {
                  history.back();
                },
              }}
            >
              返回
            </Button>
          ),
        }}
      >
        <BetaSchemaForm<API.DeptUpdateReqVO>
          {...{
            layout: 'horizontal',
            layoutType: 'Form',
            columns,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            submitter: {
              render: (_props, doms) => (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms}</Space>
                  </Col>
                </Row>
              ),
            },
            onFinish,
            // params,
            request: async () => {
              // if(p.id)
              if (params.id) {
                const { data } = await detailInfoUsingGET(params as API.detailInfoUsingGETParams);
                return data || {};
              }
              return { status: 1 };
            },
          }}
        ></BetaSchemaForm>
      </Card>
    </PageContainer>
  );
};

export default DeptEdit;
