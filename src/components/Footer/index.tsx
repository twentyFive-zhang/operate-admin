// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
// import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  // const intl = useIntl();
  // const defaultMessage = intl.formatMessage({
  //   id: 'app.copyright.produced',
  //   defaultMessage: '江流儿出品',
  // });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        // background: 'none',
        position: 'sticky',
        bottom: '0',
        zIndex: 10,
        // filter: 'blur(10px)',
        // opacity: 0.4,
      }}
      copyright={`${currentYear} 江流儿出品`}
      links={[]}
    />
  );
};

export default Footer;
