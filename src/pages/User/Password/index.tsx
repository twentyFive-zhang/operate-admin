import {
  PageContainer,
  ProCard,
  BetaSchemaForm,
  type ProFormInstance,
} from '@ant-design/pro-components';
import { updatePwdUsingPUT } from '@/services/admin/zuzhimokuaiyonghuguanli';
import { Row, Col, Space, message, Button } from 'antd';
import { history } from '@umijs/max';
import { useRef } from 'react';
import { toLogin } from '@/utils';

const UserCenter: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  return (
    <PageContainer
      {...{
        header: { title: '' },
      }}
    >
      <ProCard
        {...{
          title: '个人设置',
          bordered: true,
          headerBordered: true,
          extra: (
            <Space>
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
          <BetaSchemaForm<API.UpdatePasswordReqVO>
            {...{
              layoutType: 'Form',
              formRef,
              columns: [
                {
                  title: '旧密码',
                  dataIndex: 'oldPwd',
                  valueType: 'password',
                  formItemProps: {
                    rules: [{ required: true }],
                  },
                },
                {
                  title: '新密码',
                  dataIndex: 'newPwd',
                  valueType: 'password',
                  formItemProps: {
                    rules: [{ required: true }],
                  },
                },
                {
                  title: '确认新密码',
                  dataIndex: 'newPwd1',
                  valueType: 'password',

                  formItemProps: {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      { required: true },
                      {
                        validator: async (rule, value) => {
                          const newPwd = formRef.current?.getFieldValue('newPwd');
                          if (newPwd !== value) throw new Error('请确认两次输入相同密码');
                        },
                        validateTrigger: 'onBlur',
                      },
                    ],
                  },
                },
              ],
              layout: 'horizontal',
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
              submitter: {
                render: (props, dom) => {
                  return (
                    <Row>
                      <Col {...{ offset: 4 }}>
                        <Space>{dom[1]}</Space>
                      </Col>
                    </Row>
                  );
                },
              },
              onFinish: async (data) => {
                await updatePwdUsingPUT(data);
                message.success('密码修改成功,即将退出登录');
                toLogin();
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
