import Footer from '@/components/Footer';
import { BulbFilled, BulbOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, matchRoutes } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import React from 'react';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { Button, Dropdown, Spin } from 'antd';
import { getHomeInfoUsingGET } from './services/admin/shouyeshuju';
import type { MenuDataItem } from '@ant-design/pro-components';
import avatarPng from '@/assets/avart.png';
// type MenuDataItem = ProLayoutProps['MenuDataItem'];
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

const systemIcon = {
  light: <BulbOutlined />,
  realDark: <BulbFilled></BulbFilled>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfoRespVO;
  menus?: API.PermissionRespNode[];
  permissions?: string[];
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.HomeRespVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getHomeInfoUsingGET();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const data = await fetchUserInfo();
    const { userInfo: currentUser, menus, permissions } = data || {};
    return {
      fetchUserInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
      currentUser,
      menus,
      permissions,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

const sortMenuData = (list: API.PermissionRespNode[]): MenuDataItem[] => {
  return list.map((item) => ({
    ...item,
    name: item.title,
    path: item.url,
    children: !!item.children?.length ? sortMenuData(item.children) : [],
    key: `${item.id}-${item.perms}`,
    perms: item.perms,
    // isUrl: !!item.outChain,
  }));
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState, loading }) => {
  // console.log({ loading }, initialState?.menus);
  return {
    actionsRender: () => [
      <div
        key="dept"
        {...{ style: { fontSize: '14px', lineHeight: '24px', marginRight: '10px', padding: 0 } }}
      >
        <span {...{ style: { color: '#333', fontWeight: 500 } }}>所属公司:</span>
        {initialState?.currentUser?.deptName}
      </div>,
      <Dropdown
        key="system"
        {...{
          arrow: true,
          placement: 'bottom',
          menu: {
            selectable: true,
            defaultSelectedKeys: ['light'],
            onSelect: ({ key }: { key: string }) => {
              // console.log({ s });
              setInitialState({
                ...initialState,
                settings: { ...initialState?.settings, navTheme: key as 'light' | 'realDark' },
              });
            },
            items: [
              {
                key: 'light',
                icon: <BulbOutlined></BulbOutlined>,
                label: '亮色模式',
              },
              {
                key: 'realDark',
                icon: <BulbFilled></BulbFilled>,
                label: '暗色模式',
              },
            ],
          },
        }}
      >
        <Button {...{ icon: systemIcon[initialState?.settings?.navTheme || 'light'] }}></Button>
      </Dropdown>,
    ],
    avatarProps: {
      src: avatarPng,
      // icon: <ContactsTwoTone />,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown {...{ menu: true }}>{avatarChildren}</AvatarDropdown>;
      },
    },

    waterMarkProps: {
      // content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,

    onPageChange: () => {
      // const matches = useMatch();
      const { location } = history;
      console.log({ location, matchRoutes });
      // if(!initialState?.permissions?.includes()){

      // }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      console.log({ props }, props.location);
      if (loading) return <Spin />;

      return <>{children}</>;
      // <>
      //   {children}
      //   {/* <SettingDrawer
      //     disableUrlParams
      //     enableDarkTheme
      //     settings={initialState?.settings}
      //     onSettingChange={(settings) => {
      //       setInitialState((preInitialState) => ({
      //         ...preInitialState,
      //         settings,
      //       }));
      //     }}
      //   /> */}
      // </>
    },
    menuProps: {
      theme: initialState?.settings?.navTheme === 'light' ? 'light' : 'dark',
    },
    menuDataRender: () => sortMenuData(initialState?.menus || []),
    menuItemRender: (item) => {
      if (!!item.outChain) {
        return <a {...{ href: item.url, target: '_blank' }}>{item.name}</a>;
      }

      return <Link to={item.path || ''}>{item.name}</Link>;
    },
    subMenuItemRender: (item) => {
      return <>{item.name}</>;
    },
    // menuData: initialState?.menus || [],
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
