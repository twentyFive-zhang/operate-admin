// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新菜单权限接口 PUT /sys/permission */
export async function updatePermissionUsingPUT(
  body: API.PermissionUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/permission', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增菜单权限接口 POST /sys/permission */
export async function addPermissionUsingPOST(
  body: API.PermissionAddReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultSysPermission_>('/sys/permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询菜单权限接口 GET /sys/permission/${param0} */
export async function detailInfoUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysPermission_>(`/sys/permission/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除菜单权限接口 DELETE /sys/permission/${param0} */
export async function deletedUsingDELETE1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/permission/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取所有目录菜单树接口 GET /sys/permission/tree */
export async function getAllMenusPermissionTreeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllMenusPermissionTreeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.DataResultListPermissionRespNode_>('/sys/permission/tree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有目录菜单树接口 GET /sys/permission/tree/all */
export async function getAllPermissionTreeUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultListPermissionRespNode_>('/sys/permission/tree/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取所有菜单权限接口 GET /sys/permissions */
export async function getAllMenusPermissionUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultListSysPermission_>('/sys/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页查询菜单权限接口 POST /sys/permissions */
export async function pageInfoUsingPOST1(
  body: API.PermissionPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysPermission_>('/sys/permissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
