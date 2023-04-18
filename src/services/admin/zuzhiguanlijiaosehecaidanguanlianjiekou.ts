// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改或者新增角色菜单权限接口 POST /sys/role/permission */
export async function operationRolePermissionUsingPOST(
  body: API.RolePermissionOperationReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/role/permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
