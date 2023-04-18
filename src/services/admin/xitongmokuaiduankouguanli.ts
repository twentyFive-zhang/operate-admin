// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 测试列表 POST /sys/list */
export async function listInfoUsingPOST(body: API.PortPageReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultListSysPort_>('/sys/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新端口信息接口 PUT /sys/port */
export async function updateDeptUsingPUT2(
  body: API.PortUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/port', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增端口接口 POST /sys/port */
export async function addRoleUsingPOST1(body: API.PortAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultSysPort_>('/sys/port', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询端口详情接口 GET /sys/port/${param0} */
export async function detailInfoUsingGET3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET3Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysPort_>(`/sys/port/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除端口接口 DELETE /sys/port/${param0} */
export async function deletedUsingDELETE4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE4Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/port/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取端口信息接口 POST /sys/ports */
export async function pageInfoUsingPOST4(
  body: API.PortPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysPort_>('/sys/ports', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
