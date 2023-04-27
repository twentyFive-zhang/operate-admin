import { Button, Popconfirm, message } from 'antd';
import { memo } from 'react';
// import { PopButton } from '@/components/Common/PopButton';

type ModeTypeEnum = 'default' | 'multiple';

// type PopButtonProps<
//   T extends object,
//   // ModeType extends ModeTypeEnum = 'default'
// > = {
//   // data: ModeType extends 'default' ? T : T[];
//   data: T | T[];
//   // request(p: (ModeType extends 'default' ? T : T[]) | any): Promise<API.DataResult>;
//   request(p: T | T[] | any): Promise<API.DataResult>;
//   rowKey: keyof T;
//   onSuccess?: () => void;
//   onError?: () => void;
//   mode?: 'default' | 'multiple';
//   // sortParams?: (p: ModeType extends 'default' ? T : T[]) => any;
//   sortParams?: (p: T | T[]) => any;
// };

type PopButtonProps<T extends object, ModeType extends ModeTypeEnum = 'default'> = {
  default: {
    data: T;
    request(p: T | any): Promise<API.DataResult>;
    rowKey: keyof T;
    onSuccess?: () => void;
    onError?: () => void;
    mode?: 'default' | 'multiple';
    // sortParams?: (p: T) => any;
  };
  multiple: {
    data: T[];
    request(p: T[] | any): Promise<API.DataResult>;
    rowKey: keyof T;
    onSuccess?: () => void;
    onError?: () => void;

    // mode?: 'default' | 'multiple';
    // sortParams?: (p: T[]) => any;
  };
}[ModeType] & { sortParams?: (p: T | T[]) => any; mode?: ModeTypeEnum } & {
  children?: React.ReactNode;
};

// type ITest = keyof { a: 1; b: 2 };

export function PopButtonWrapper<
  RecordType extends object,
  ModeType extends ModeTypeEnum = 'default',
>({
  data,
  request,
  rowKey,
  onError,
  onSuccess,
  sortParams,
  mode = 'default',
  children,
}: PopButtonProps<RecordType, ModeType>) {
  const onConfirm = async () => {
    try {
      // console.log({ data });
      const params = Array.isArray(data) ? data.map((item) => item[rowKey]) : data;
      await request(sortParams ? sortParams(params) : params);
      message.success(`${mode === 'multiple' ? '批量' : ''}删除成功`);
      onSuccess?.();
    } catch {
      onError?.();
    }
  };

  console.info(`重新渲染${Array.isArray(data) ? data[0]?.[rowKey] : data?.[rowKey]}`);
  return (
    <Popconfirm
      {...{ title: `是否确认${mode === 'multiple' ? '批量删除数据' : '删除该数据'}？`, onConfirm }}
    >
      <Button
        {...{
          type: 'primary',
          danger: true,
          disabled: Array.isArray(data) && !data.length,
        }}
      >
        {mode === 'multiple' ? '批量' : ''}删除 {children}
      </Button>
    </Popconfirm>
  );
}

// export default memo(PopButton);
const PopButton = memo(
  PopButtonWrapper,
  ({ data: prevData, rowKey: prevRowKey }, { data: nextData }) => {
    // if (prevProps.mode === 'multiple') {
    //   // return prevProps.data
    //   return true;
    // }
    // const {data:prevData}=
    if (Array.isArray(prevData) && Array.isArray(nextData)) {
      // nextProps.data.length
      console.log(
        prevData.length === nextData.length &&
          prevData
            .map((item) => item[prevRowKey])
            .sort()
            .toString() ===
            nextData
              .map((item) => item[prevRowKey])
              .sort()
              .toString(),
        { nextData, prevData },
      );
      return (
        prevData.length === nextData.length &&
        prevData
          .map((item) => item[prevRowKey])
          .sort()
          .toString() ===
          nextData
            .map((item) => item[prevRowKey])
            .sort()
            .toString()
      );
      // return false;
      // return (!prevData.length && !nextData.length) || (!!prevData.length && !!nextData.length);
    }
    return prevData?.[prevRowKey] === nextData?.[prevRowKey];
  },
) as typeof PopButtonWrapper;

// function withMemoPopButton<T extends object>() {
//   return memo(PopButtonWrapper<T>);
// }
// PopButton.displayName = 'PopButton';
export default PopButton;
