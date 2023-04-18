import { useState } from 'react';
import { loginUsingPOST } from '@/services/admin/zuzhimokuaiyonghuguanli';
import { message } from 'antd';
import { setStorage } from '@/utils';

export default () => {
  const [tokenData, setTokenData] = useState<API.LoginRespVO>({});
  const [loading, setLoading] = useState<boolean>(false);
  const login = async (params: API.LoginReqVO) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        const { data } = await loginUsingPOST(params);
        if (data) {
          setTokenData(data);
          setStorage('authorization', data.accessToken);
          setStorage('refresh_token', data.refreshToken);
          message.success('登录成功');
          resolve(data);
        }
      } catch {
        // message.error('登录失败，请重试！');
        reject();
      }
      setLoading(false);
    });
  return {
    tokenData,
    loading,
    login,
  };
};
