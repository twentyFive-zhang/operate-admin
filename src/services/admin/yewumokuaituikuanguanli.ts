// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量退款 POST /yw/batchDrawback */
export async function batchCollectionUsingPOST1(
  body: API.BatchDrawbackReqVo,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/yw/batchDrawback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量导出退款信息 POST /yw/batchDrawbackExport */
export async function batchExportUsingPOST1(
  body: API.DrawbackPageReqVO,
  options?: { [key: string]: any },
) {
  return request<any>('/yw/batchDrawbackExport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新退款信息接口 PUT /yw/drawback */
export async function updateUsingPUT1(
  body: API.DrawbackUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/yw/drawback', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增退款接口 POST /yw/drawback */
export async function addUsingPOST1(body: API.DrawbackAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultYwDrawback_>('/yw/drawback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询退款详情接口 GET /yw/drawback/${param0} */
export async function detailInfoUsingGET9(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET9Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultDrawbackRespVO_>(`/yw/drawback/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除退款接口 DELETE /yw/drawback/${param0} */
export async function deletedUsingDELETE9(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE9Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/yw/drawback/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 退款新增使用 根据账户查询最后一次充值记录 POST /yw/drawback/getDrawback/${param0} */
export async function getAccountListUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAccountListUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { accountName: param0, ...queryParams } = params;
  return request<API.DataResultListAccountNameListVo_>(`/yw/drawback/getDrawback/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 分页获取退款信息接口 POST /yw/drawbacks */
export async function pageInfoUsingPOST10(
  body: API.DrawbackPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVODrawbackRespVO_>('/yw/drawbacks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入退款信息 POST /yw/importDrawback */
export async function importDrawbackUsingPOST(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.DataResult>('/yw/importDrawback', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
