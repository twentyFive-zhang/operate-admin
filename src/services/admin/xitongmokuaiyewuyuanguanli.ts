// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新业务员信息接口 PUT /sys/salesman */
export async function updateDeptUsingPUT3(
  body: API.SalesmanUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/sys/salesman', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增业务员接口 POST /sys/salesman */
export async function addSysSalesmanUsingPOST(
  body: API.SalesmanAddReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultSysSalesman_>('/sys/salesman', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询业务员详情接口 GET /sys/salesman/${param0} */
export async function detailInfoUsingGET4(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET4Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultSysSalesman_>(`/sys/salesman/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除业务员接口 DELETE /sys/salesman/${param0} */
export async function deletedUsingDELETE5(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE5Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/sys/salesman/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取业务员信息接口 POST /sys/salesmans */
export async function pageInfoUsingPOST5(
  body: API.SalesmanPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOSysSalesman_>('/sys/salesmans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
