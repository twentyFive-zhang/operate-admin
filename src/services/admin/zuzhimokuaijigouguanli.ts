// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新组织信息接口 PUT /sys/dept */
export async function updateDeptUsingPUT(
  body: API.DeptUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/dept', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增组织接口 POST /sys/dept */
export async function addDeptUsingPOST(body: API.DeptAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultSysDept_>('/sys/dept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询组织详情接口 GET /sys/dept/${param0} */
export async function detailInfoUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysDept_>(`/sys/dept/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除组织接口 DELETE /sys/dept/${param0} */
export async function deletedUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/dept/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 树型组织列表接口 GET /sys/dept/tree */
export async function getTreeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTreeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.DataResultListDeptRespNodeVO_>('/sys/dept/tree', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取组织下所有用户接口 POST /sys/dept/users */
export async function pageDeptUserInfosUsingPOST(
  body: API.UserPageUserByDeptReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysUser_>('/sys/dept/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取机构列表接口 GET /sys/depts */
export async function getDeptAllUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultListSysDept_>('/sys/depts', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取组织信息接口 POST /sys/depts */
export async function pageInfoUsingPOST(body: API.DeptPageReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultPageVOSysDept_>('/sys/depts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
