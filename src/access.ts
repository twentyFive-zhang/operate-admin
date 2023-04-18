/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser; permissions: string[] } | undefined,
) {
  const { currentUser, permissions } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    hasPermission: (s: string) => permissions?.includes?.(s),
    hasAuth: ({ name }: { name: string; [key: string]: any }) => {
      // console.log({ route });
      return permissions?.includes(name);
    },
  };
}
