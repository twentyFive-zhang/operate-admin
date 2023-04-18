import { PageContainer, ProCard, BetaSchemaForm } from '@ant-design/pro-components';
import {
  youSelfInfoUsingGET,
  updateUserInfoUsingPUT,
} from '@/services/admin/zuzhimokuaiyonghuguanli';
import { Row, Col, Space, message, Button } from 'antd';
import { useState } from 'react';
import { history } from '@umijs/max';

const UserCenter: React.FC = () => {
  const [readonly, setReadonly] = useState<boolean>(true);

  return (
    <PageContainer
      {...{
        header: { title: '' },
      }}
    >
      <ProCard
        {...{
          title: '个人中心',
          bordered: true,
          headerBordered: true,
          extra: (
            <Space>
              <Button
                {...{
                  type: 'primary',
                  onClick: () => {
                    setReadonly(false);
                  },
                }}
              >
                编辑
              </Button>
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
            </Space>
          ),
        }}
      >
        <div {...{ style: { width: '60%' } }}>
          <BetaSchemaForm<API.SysUser>
            {...{
              layoutType: 'Form',
              readonly,
              columns: [
                {
                  title: '账号',
                  dataIndex: 'username',
                  readonly: true,
                },
                {
                  title: '账号ID',
                  dataIndex: 'id',
                  formItemProps: {
                    noStyle: true,
                  },
                  renderFormItem: () => <></>,
                  renderText: () => <></>,
                  render: () => <></>,
                },
                {
                  title: '真实姓名',
                  dataIndex: 'realName',
                  formItemProps: {
                    // required: true,
                    rules: [{ required: true }],
                  },
                },
                {
                  title: '手机号',
                  dataIndex: 'phone',
                  formItemProps: {
                    // required: true,
                    rules: [{ required: true }],
                  },
                },
                {
                  title: '邮箱',
                  dataIndex: 'email',
                },
                // {
                //   title: '状态',
                //   dataIndex: 'status',
                //   valueType: 'select',
                //   formItemProps: {
                //     // required: true,
                //     rules: [{ required: true }],
                //   },
                //   fieldProps: {
                //     options: [
                //       { value: 1, label: '启用' },
                //       { value: 0, label: '禁用' },
                //     ],
                //   },
                // },
                {
                  title: '性别',
                  dataIndex: 'sex',
                  valueType: 'select',
                  formItemProps: {
                    // required: true,
                    rules: [{ required: true }],
                  },
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
              ],
              request: async () => {
                const { data } = await youSelfInfoUsingGET();
                return data || {};
              },
              layout: 'horizontal',
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
              requiredMark: !readonly,
              submitter: readonly
                ? false
                : {
                    render: (props, dom) => {
                      return (
                        <Row>
                          <Col {...{ offset: 4 }}>
                            <Space>{dom}</Space>
                          </Col>
                        </Row>
                      );
                    },
                  },
              onFinish: async (data) => {
                await updateUserInfoUsingPUT(data);
                message.success('个人信息修改成功');
                setReadonly(true);
                return true;
              },
            }}
          ></BetaSchemaForm>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default UserCenter;
