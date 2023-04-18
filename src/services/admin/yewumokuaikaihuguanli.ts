// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新开户信息接口 PUT /yw/account */
export async function updateAccountUsingPUT(
  body: API.AccountUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/yw/account', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增开户接口 POST /yw/account */
export async function addAccountUsingPOST(
  body: API.AccountAddReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultYwAccount_>('/yw/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询开户详情接口 GET /yw/account/${param0} */
export async function detailInfoUsingGET7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET7Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultAccountInfoVO_>(`/yw/account/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除开户接口 DELETE /yw/account/${param0} */
export async function deletedUsingDELETE7(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE7Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/yw/account/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 记账新增修改使用 根据账户名称查询端口和业务员信息 GET /yw/account/getPortAndSalesman/${param0} */
export async function getPortAndSalesmanUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPortAndSalesmanUsingGETParams,
  options?: { [key: string]: any },
) {
  const { accountName: param0, ...queryParams } = params;
  return request<API.DataResultPortAndSalesmanRespVo_>(`/yw/account/getPortAndSalesman/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取开户信息接口 POST /yw/accounts */
export async function pageInfoUsingPOST8(
  body: API.AccountPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOAccountRespVO_>('/yw/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
