// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 修改或者新增用户角色接口 POST /sys/user/role */
export async function operationUserRoleUsingPOST(
  body: API.UserRoleOperationReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/user/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
