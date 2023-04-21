import { history } from '@umijs/max';
import { stringify } from 'querystring';

export const setStorage = (key: string, value?: string) => {
  localStorage.setItem(`${REACT_APP_ENV}-${key}`, value || '');
};

export const getStorage = (key: string) => localStorage.getItem(`${REACT_APP_ENV}-${key}`);

export const removeStorage = (key: string) => {
  localStorage.removeItem(`${REACT_APP_ENV}-${key}`);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const toLogin = () => {
  // const loginData = getStorage('loginData');
  // clearStorage();
  // setStorage('loginData', loginData || '');

  removeStorage('authorization');
  removeStorage('refresh_token');
  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};
