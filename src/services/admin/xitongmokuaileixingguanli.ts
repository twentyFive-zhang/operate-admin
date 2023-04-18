// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新类型信息接口 PUT /sys/type */
export async function updateDeptUsingPUT4(
  body: API.TypeUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/type', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增类型接口 POST /sys/type */
export async function addRoleUsingPOST2(body: API.TypeAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultSysType_>('/sys/type', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询类型详情接口 GET /sys/type/${param0} */
export async function detailInfoUsingGET5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET5Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysType_>(`/sys/type/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除类型接口 DELETE /sys/type/${param0} */
export async function deletedUsingDELETE6(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE6Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/type/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取类型信息接口 POST /sys/types */
export async function pageInfoUsingPOST6(
  body: API.TypePageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysType_>('/sys/types', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
