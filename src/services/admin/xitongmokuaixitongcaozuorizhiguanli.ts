// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 分页查询系统操作日志接口 POST /sys/logs */
export async function pageInfoUsingPOST3(
  body: API.SysLogPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysLog_>('/sys/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除日志接口 DELETE /sys/logs */
export async function deletedUsingDELETE3(body: string[], options?: { [key: string]: any }) {
  return request<API.DataResult>('/sys/logs', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
