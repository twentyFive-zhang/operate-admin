// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新角色信息接口 PUT /sys/role */
export async function updateDeptUsingPUT1(
  body: API.RoleUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增角色接口 POST /sys/role */
export async function addRoleUsingPOST(body: API.RoleAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultSysRole_>('/sys/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询角色详情接口 GET /sys/role/${param0} */
export async function detailInfoUsingGET2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET2Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysRole_>(`/sys/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除角色接口 DELETE /sys/role/${param0} */
export async function deletedUsingDELETE2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE2Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取角色信息接口 POST /sys/roles */
export async function pageInfoUsingPOST2(
  body: API.RolePageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysRole_>('/sys/roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
