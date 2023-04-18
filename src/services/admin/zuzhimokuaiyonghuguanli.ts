// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询用户详情接口 GET /sys/user */
export async function youSelfInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultSysUser_>('/sys/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新用户信息接口 PUT /sys/user */
export async function updateUserInfoUsingPUT(
  body: API.UserUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增用户接口 POST /sys/user */
export async function addUserUsingPOST(body: API.UserAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResult>('/sys/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户接口 DELETE /sys/user */
export async function deletedUserUsingDELETE(body: string[], options?: { [key: string]: any }) {
  return request<API.DataResult>('/sys/user', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询用户详情接口 GET /sys/user/${param0} */
export async function detailInfoUsingGET6(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET6Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysUser_>(`/sys/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新用户信息接口 PUT /sys/user/info */
export async function updateUserInfoByIdUsingPUT(
  body: API.UserUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/user/info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录接口 POST /sys/user/login */
export async function loginUsingPOST(body: API.LoginReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultLoginRespVO_>('/sys/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出接口 GET /sys/user/logout */
export async function logoutUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResult>('/sys/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改密码接口 PUT /sys/user/pwd */
export async function updatePwdUsingPUT(
  body: API.UpdatePasswordReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/user/pwd', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册接口 POST /sys/user/register */
export async function registerUsingPOST(body: API.RegisterReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultString_>('/sys/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 赋予角色-获取所有角色接口 GET /sys/user/roles/${param0} */
export async function getUserOwnRoleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserOwnRoleUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.DataResultUserOwnRoleRespVO_>(`/sys/user/roles/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 赋予角色-用户赋予角色接口 PUT /sys/user/roles/${param0} */
export async function setUserOwnRoleUsingPUT(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.setUserOwnRoleUsingPUTParams,
  body: string[],
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.DataResultUserOwnRoleRespVO_>(`/sys/user/roles/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 用户刷新token接口 GET /sys/user/token */
export async function refreshTokenUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultString_>('/sys/user/token', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 引导客户端去登录 GET /sys/user/unLogin */
export async function unLoginUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResult>('/sys/user/unLogin', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 分页获取用户列表接口 POST /sys/users */
export async function pageInfoUsingPOST7(
  body: API.UserPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysUser_>('/sys/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
