// import { getStorage } from '@/utils';
// import { useState } from 'react';
import { type ColumnsState } from '@ant-design/pro-components';

export const useColumnsState = (key: string) => {
  // const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>();
  // const onChange = (map: Record<string, ColumnsState>) => {};
  // console.log(JSON.parse(getStorage(key) || '{}'));
  // const defaultValue = JSON.parse(getStorage(key) || '{}');
  return {
    columnsState: {
      // defaultValue: ,
      persistenceKey: `${REACT_APP_ENV}-${key}`,
      onChange: (d: Record<string, ColumnsState>) => {
        console.log(d);
        // console.log(JSON.parse(JSON.stringify(d)));
      },
      persistenceType: 'localStorage',
    },
  };
};
