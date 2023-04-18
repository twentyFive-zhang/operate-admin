// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取首页数据接口 GET /sys/home */
export async function getHomeInfoUsingGET(options?: { [key: string]: any }) {
  return request<API.DataResultHomeRespVO_>('/sys/home', {
    method: 'GET',
    ...(options || {}),
  });
}
