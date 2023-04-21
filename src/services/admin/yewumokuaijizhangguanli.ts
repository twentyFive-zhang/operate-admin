// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 批量回款 POST /yw/batchCollection */
export async function batchCollectionUsingPOST(
  body: API.BatchCollectionReqVo,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/yw/batchCollection', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量导出记账信息 POST /yw/batchExport */
export async function batchExportUsingPOST(
  body: API.BookkeepPageReqVO,
  options?: { [key: string]: any },
) {
  return request<any>('/yw/batchExport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新记账信息接口 PUT /yw/bookkeeping */
export async function updateUsingPUT(
  body: API.BookkeepUpdateReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResult>('/yw/bookkeeping', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增记账接口 POST /yw/bookkeeping */
export async function addUsingPOST(body: API.BookkeepAddReqVO, options?: { [key: string]: any }) {
  return request<API.DataResultYwBookkeeping_>('/yw/bookkeeping', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询记账详情接口 GET /yw/bookkeeping/${param0} */
export async function detailInfoUsingGET8(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailInfoUsingGET8Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResultBookkeepRespVO_>(`/yw/bookkeeping/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 删除记账接口 DELETE /yw/bookkeeping/${param0} */
export async function deletedUsingDELETE8(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deletedUsingDELETE8Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DataResult>(`/yw/bookkeeping/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 记账新增修改抵扣账户使用  根据账户名称 记账查询抵扣账户信息 GET /yw/bookkeeping/getDeduction/${param0}/${param1} */
export async function getDeductionUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDeductionUsingGETParams,
  options?: { [key: string]: any },
) {
  const { accountName: param0, typeId: param1, ...queryParams } = params;
  return request<API.DataResultDeductionRespVo_>(
    `/yw/bookkeeping/getDeduction/${param0}/${param1}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 分页获取记账信息接口 POST /yw/bookkeepings */
export async function pageInfoUsingPOST9(
  body: API.BookkeepPageReqVO,
  options?: { [key: string]: any },
) {
  return request<API.DataResultPageVOBookkeepPageRespVO_>('/yw/bookkeepings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 导入记账信息 POST /yw/import */
export async function importBookkeepingUsingPOST(
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

  return request<API.DataResult>('/yw/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
