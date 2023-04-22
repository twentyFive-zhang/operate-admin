import {
  pageInfoUsingPOST3,
  deletedUsingDELETE3,
} from '@/services/admin/xitongmokuaixitongcaozuorizhiguanli';
import {
  PageContainer,
  ProTable,
  type ProColumns,
  type ActionType,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef } from 'react';

const Log: React.FC = () => {
  const request = async (params: API.SysLogPageReqVO & { current?: number }) => {
    // console.log({ params });
    const { current: pageNum, ...rest } = params;
    const { data } = await pageInfoUsingPOST3({ ...rest, pageNum });
    return { data: data?.list || [], total: data?.totalRows || 0 };
  };
  const actionRef = useRef<ActionType>();

  const deleteLogs = async (ids: string[]) => {
    await deletedUsingDELETE3(ids);
    message.success('删除成功!');
    actionRef.current?.clearSelected?.();
    actionRef.current?.reload();
  };

  const columns: ProColumns<API.SysLog>[] = [
    // {
    //   title: '用户ID',
    //   dataIndex: 'id',
    // },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '用户操作',
      dataIndex: 'operation',
    },
    {
      title: '请求参数',
      dataIndex: 'params',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'showTime',
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
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      fixed: 'right',
      render: (text, { id }) => [
        <Button
          key="delete"
          {...{
            type: 'primary',
            danger: true,
            onClick: () => {
              if (id) deleteLogs([id]);
            },
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer
      {...{
        header: { title: '' },
        breadcrumb: {
          routes: [
            { breadcrumbName: '系统', path: '/sys' },
            { breadcrumbName: '日志管理', path: '/sys/log' },
          ],
        },
        title: '',
      }}
    >
      <ProTable<API.SysLog>
        {...{
          actionRef,
          headerTitle: '日志管理',
          // search: false,
          columns,
          request,
          rowKey: 'id',
          toolBarRender: (action, { selectedRowKeys }) => [
            <Button
              key="delete"
              {...{
                type: 'primary',
                danger: true,
                disabled: !selectedRowKeys?.length,
                onClick: () => {
                  deleteLogs(selectedRowKeys as string[]);
                },
              }}
            >
              批量删除
            </Button>,
          ],
          rowSelection: {},
          bordered: true,
          search: {},
          pagination: {
            defaultPageSize: 10,
          },
        }}
      ></ProTable>
    </PageContainer>
  );
};

export default Log;
