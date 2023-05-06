declare namespace API {
  type AccountAddReqVO = {
    /** 账户名称 */
    accountName?: string;
    /** 端口id */
    portId?: number;
    /** 备注 */
    remarks?: string;
    /** 业务员ID */
    salesmanId?: number;
    /** 状态(1:正常0:弃用) */
    status?: number;
    /** 行业 */
    trade?: string;
  };

  type AccountInfoVO = {
    accountName?: string;
    createName?: string;
    createTime?: string;
    deleted?: number;
    id?: number;
    portId?: number;
    remarks?: string;
    salesmanId?: number;
    status?: number;
    trade?: string;
    /** 是否可以修改(true可以,false 不可以) */
    update?: boolean;
    updateName?: string;
    updateTime?: string;
  };

  type AccountNameListVo = {
    /** 账户ID */
    accountId?: number;
    /** 账户名称 */
    accountName?: string;
    /** 记账ID */
    bookkeepId?: number;
    /** 渠道点位 */
    canalPoint?: number;
    /** 百度币 */
    currency?: number;
    /** 是否有抵扣(0否,1是) */
    deductionStatus?: number;
    deductionVo?: DeductionVo;
    /** 是否有退款(0否,1是) */
    drawbackStatus?: number;
    drawbackVo?: DrawbackVo;
    /** 拿到点位 */
    getPoint?: number;
    /** 端口id */
    portId?: number;
    /** 端口名称 */
    portName?: string;
    /** 业务员ID */
    salesmanId?: number;
    /** 业务员名称 */
    salesmanName?: string;
    /** 行业 */
    trade?: string;
    /** 类型ID */
    typeId?: number;
    /** 类型名称 */
    typeName?: string;
  };

  type AccountPageReqVO = {
    /** 账户名称 */
    accountName?: string;
    /** 结束时间 */
    endTime?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 端口id */
    portId?: number;
    /** 业务员ID */
    salesmanId?: number;
    /** 开始时间 */
    startTime?: string;
    /** 状态(1:正常0:弃用) */
    status?: number;
    /** 行业 */
    trade?: string;
  };

  type AccountRespVO = {
    /** 账户名称 */
    accountName?: string;
    /** 创建人 */
    createName?: string;
    /** 创建时间 */
    createTime?: string;
    /** 拿到点位 */
    getPoint?: number;
    /** id */
    id?: number;
    pid?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
    /** 业务员名称 */
    salesmanName?: string;
    sid?: number;
    /** 状态(1:正常0:弃用) */
    status?: number;
    /** 状态(1:正常0:弃用) */
    statusStr?: string;
    /** 行业 */
    trade?: string;
    /** 修改人 */
    updateName?: string;
    /** 修改时间 */
    updateTime?: string;
  };

  type AccountUpdateReqVO = {
    /** 账户名称 */
    accountName?: string;
    /** id */
    id?: number;
    /** 端口id */
    portId?: number;
    /** 备注 */
    remarks?: string;
    /** 业务员ID */
    salesmanId?: number;
    /** 状态(1:正常0:弃用) */
    status?: number;
    /** 行业 */
    trade?: string;
  };

  type addAccountUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addDeptUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addPermissionUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addRoleUsingPOST1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addRoleUsingPOST2Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addRoleUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addSysSalesmanUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addUserUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addUsingPOST1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type addUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type BatchCollectionReqVo = {
    /** 回款类型 */
    collection?: string;
    /** 对外支付 */
    externalPayment?: string;
    /** 记账ids */
    ids?: number[];
  };

  type batchCollectionUsingPOST1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type batchCollectionUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type BatchDrawbackReqVo = {
    /** 是否退款(0未退款 1 已退款) */
    drawbackStatus?: number;
    /** 记账ids */
    ids?: number[];
  };

  type batchExportUsingPOST1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type batchExportUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type BookkeepAddReqVO = {
    /** 账户id */
    accountId?: number;
    /** 渠道点位 */
    canalPoint?: number;
    /** 回款类型 */
    collection?: string;
    /** 日期 */
    createTime?: string;
    /** 百度币 */
    currency?: number;
    /** 抵扣金额 */
    deductionAmount?: number;
    /** 对外支付 */
    externalPayment?: string;
    /** 拿到点位 */
    getPoint?: number;
    /** 抵扣账户列表 */
    list?: DeductionReqVo[];
    /** 备注 */
    remarks?: string;
    /** 类型ID */
    typeId?: number;
  };

  type BookkeepPageReqVO = {
    /** 账户名称 */
    accountName?: string;
    /** 回款类型 */
    collection?: string;
    /** 是否回款(0否 1 是) */
    collectionStatus?: number;
    /** 是否抵扣完结(0否,1是) */
    deductionEndStatus?: number;
    /** 是否有抵扣(0否,是) */
    deductionStatus?: number;
    /** 结束时间 */
    endTime?: string;
    /** 对外支付 */
    externalPayment?: string;
    /** 对外支付状态(0未支付,1已支付) */
    externalPaymentStatus?: number;
    /** 拿到点位 */
    getPoint?: number;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 端口id */
    portId?: number;
    /** 充值单号 */
    rechargeNumber?: string;
    /** 业务员ID */
    salesmanId?: number;
    /** 开始时间 */
    startTime?: string;
    /** 状态(1:进行中0:已完成) */
    status?: number;
    /** 行业 */
    trade?: string;
    /** 类型ID */
    typeId?: number;
  };

  type BookkeepPageRespVO = {
    accountId?: number;
    /** 账户名称 */
    accountName?: string;
    canalPoint?: number;
    collection?: string;
    collectionAmount?: number;
    collectionStatus?: number;
    /** 是否回款(0否 1 是) */
    collectionStatusStr?: string;
    createName?: string;
    createTime?: string;
    currency?: number;
    /** 抵扣账户名称 */
    deductionAccountName?: string;
    deductionAmount?: number;
    deductionEndStatus?: number;
    deductionStatus?: number;
    /** 是否有抵扣(0否,1是) */
    deductionStatusStr?: string;
    deleted?: number;
    externalPayment?: string;
    externalPaymentStatus?: number;
    /** 对外支付状态(0未支付,1已支付) */
    externalPaymentStatusStr?: string;
    externalSettlement?: number;
    getPoint?: number;
    id?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
    profit?: number;
    rechargeNumber?: string;
    remarks?: string;
    /** 业务员名称 */
    salesmanName?: string;
    status?: number;
    /** 状态(1:进行中0:已完成) */
    statusStr?: string;
    /** 行业 */
    trade?: string;
    typeId?: number;
    /** 类型名称 */
    typeName?: string;
    updateName?: string;
    updateTime?: string;
  };

  type BookkeepRespVO = {
    accountId?: number;
    /** 账户名称 */
    accountName?: string;
    canalPoint?: number;
    collection?: string;
    collectionAmount?: number;
    collectionStatus?: number;
    /** 是否回款(0否 1 是) */
    collectionStatusStr?: string;
    createName?: string;
    createTime?: string;
    currency?: number;
    deductionAmount?: number;
    deductionEndStatus?: number;
    deductionStatus?: number;
    /** 是否有抵扣(0否,1是) */
    deductionStatusStr?: string;
    deleted?: number;
    externalPayment?: string;
    externalPaymentStatus?: number;
    /** 对外支付状态(0未支付,1已支付) */
    externalPaymentStatusStr?: string;
    externalSettlement?: number;
    getPoint?: number;
    id?: number;
    /** 抵扣账户列表 */
    list?: DeductionReqVo[];
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
    profit?: number;
    rechargeNumber?: string;
    remarks?: string;
    /** 业务员名称 */
    salesmanName?: string;
    status?: number;
    /** 状态(1:进行中0:已完成) */
    statusStr?: string;
    /** 行业 */
    trade?: string;
    typeId?: number;
    /** 类型名称 */
    typeName?: string;
    updateName?: string;
    updateTime?: string;
  };

  type BookkeepUpdateReqVO = {
    /** 渠道点位 */
    canalPoint?: number;
    /** 回款类型 */
    collection?: string;
    /** 日期 */
    createTime?: string;
    /** 百度币 */
    currency?: number;
    /** 抵扣金额 */
    deductionAmount?: number;
    /** 是否抵扣完结(0否,1是) */
    deductionEndStatus?: number;
    /** 对外支付 */
    externalPayment?: string;
    /** 拿到点位 */
    getPoint?: number;
    /** 记账id */
    id?: number;
    /** 抵扣账户列表 */
    list?: DeductionReqVo[];
    /** 备注 */
    remarks?: string;
    /** 类型ID */
    typeId?: number;
  };

  type DataResult = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: Record<string, any>;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultAccountInfoVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: AccountInfoVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultBookkeepRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: BookkeepRespVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultDeductionRespVo_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: DeductionRespVo;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultDrawbackRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: DrawbackRespVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultHomeRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: HomeRespVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListAccountNameListVo_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: AccountNameListVo[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListDeptRespNodeVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: DeptRespNodeVO[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListPermissionRespNode_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: PermissionRespNode[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListSysDept_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: SysDept[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListSysPermission_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: SysPermission[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultListSysPort_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: SysPort[];
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultLoginRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: LoginRespVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOAccountRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOAccountRespVO_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOBookkeepPageRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOBookkeepPageRespVO_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVODrawbackRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVODrawbackRespVO_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysDept_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysDept_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysLog_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysLog_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysPermission_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysPermission_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysPort_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysPort_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysRole_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysRole_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysSalesman_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysSalesman_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysType_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysType_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPageVOSysUser_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PageVOSysUser_;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultPortAndSalesmanRespVo_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: PortAndSalesmanRespVo;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultString_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    /** 需要返回的数据 */
    data?: string;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysDept_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysDept;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysPermission_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysPermission;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysPort_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysPort;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysRole_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysRole;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysSalesman_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysSalesman;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysType_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysType;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultSysUser_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: SysUser;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultUserOwnRoleRespVO_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: UserOwnRoleRespVO;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultYwAccount_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: YwAccount;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultYwBookkeeping_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: YwBookkeeping;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DataResultYwDrawback_ = {
    /** 请求响应code，0为成功 其他为失败 */
    code?: number;
    data?: YwDrawback;
    /** 响应异常码详细信息 */
    msg?: string;
    /** code为0 true */
    success?: boolean;
  };

  type DeductionReqVo = {
    /** 抵扣账户ID */
    accountId?: number;
    /** 抵扣账户名称 */
    accountName?: string;
    /** 抵扣金额 */
    amount?: number;
  };

  type DeductionRespVo = {
    /** 抵扣账户ID */
    accountId?: number;
    /** 抵扣账户名称 */
    accountName?: string;
    /** 抵扣账户存在提醒 */
    msg?: string;
  };

  type DeductionVo = {
    /** 充值账户名称 */
    accountName?: string;
    /** 抵扣金额 */
    amount?: number;
    /** 抵扣账户名称 */
    deductionName?: string;
    /** 抵扣时间 */
    deductionTime?: string;
  };

  type deletedUserUsingDELETEParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE2Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE3Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE4Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE5Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE6Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE7Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE8Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETE9Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type deletedUsingDELETEParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type DeptAddReqVO = {
    /** 部门经理id */
    deptManagerId?: string;
    /** 部门经理名称 */
    managerName?: string;
    /** 机构名称 */
    name?: string;
    /** 部门经理电话 */
    phone?: string;
    /** 父级id 一级为 0 */
    pid?: string;
    /** 机构状态(1:正常；0:弃用) */
    status?: number;
  };

  type DeptPageReqVO = {
    /** 部门名称 */
    deptName?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
  };

  type DeptRespNodeVO = {
    /** 子集 */
    children?: Record<string, any>[];
    /** 组织编码 */
    deptNo?: string;
    /** 组织id */
    id?: string;
    /** 组织父级id */
    pid?: string;
    /** 组织关系id */
    relationCode?: string;
    /** 是否展开 默认不展开(false) */
    spread?: boolean;
    /** 组织状态 */
    status?: number;
    /** 组织名称 */
    title?: string;
  };

  type DeptUpdateReqVO = {
    /** 部门经理id */
    deptManagerId?: string;
    /** 机构id */
    id?: string;
    /** 部门经理名称 */
    managerName?: string;
    /** 机构名称 */
    name?: string;
    /** 部门经理电话 */
    phone?: string;
    /** 父级id */
    pid?: string;
    /** 机构状态(1:正常；0:弃用) */
    status?: number;
  };

  type detailInfoUsingGET1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET2Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET3Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET4Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET5Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET6Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET7Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET8Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGET9Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: number;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type detailInfoUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** id */
    id: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type DrawbackAddReqVO = {
    /** 账户id */
    accountId?: number;
    /** 渠道点位 */
    canalPoint?: number;
    /** 百度币 */
    currency?: number;
    /** 是否退款(0未退款 1 已退款) */
    drawbackStatus?: number;
    /** 拿到点位 */
    getPoint?: number;
    /** 备注 */
    remarks?: string;
    /** 类型ID */
    typeId?: number;
  };

  type DrawbackPageReqVO = {
    /** 账户名称 */
    accountName?: string;
    /** 退款单号 */
    drawbackNumber?: string;
    /** 是否退款(0未退款 1 已退款) */
    drawbackStatus?: number;
    /** 退款结束时间 */
    endDrawbackTime?: string;
    /** 创建结束时间 */
    endTime?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 端口id */
    portId?: number;
    /** 是否重复退款(0否,1是) */
    repeatStatus?: number;
    /** 业务员ID */
    salesmanId?: number;
    /** 退款开始时间 */
    startDrawbackTime?: string;
    /** 创建开始时间 */
    startTime?: string;
    /** 行业 */
    trade?: string;
    /** 类型ID */
    typeId?: number;
  };

  type DrawbackRespVO = {
    accountId?: number;
    /** 账户名称 */
    accountName?: string;
    canalPoint?: number;
    createName?: string;
    createTime?: string;
    /** 创建时间文本 */
    createTimeText?: string;
    currency?: number;
    deleted?: number;
    drawbackAmount?: number;
    drawbackNumber?: string;
    drawbackStatus?: number;
    /** 是否退款(0未退款 1 已退款) */
    drawbackStatusStr?: string;
    drawbackTime?: string;
    /** 退款时间文本 */
    drawbackTimeText?: string;
    externalSettlement?: number;
    getPoint?: number;
    id?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
    profit?: number;
    remarks?: string;
    repeatStatus?: number;
    /** 是否重复退款(0否,1是) */
    repeatStatusStr?: string;
    /** 业务员名称 */
    salesmanName?: string;
    /** 行业 */
    trade?: string;
    typeId?: number;
    /** 类型名称 */
    typeName?: string;
    updateName?: string;
    updateTime?: string;
  };

  type DrawbackUpdateReqVO = {
    /** 账户id */
    accountId?: number;
    /** 渠道点位 */
    canalPoint?: number;
    /** 百度币 */
    currency?: number;
    /** 是否退款(0未退款 1 已退款) */
    drawbackStatus?: number;
    /** 拿到点位 */
    getPoint?: number;
    /** 退款id */
    id?: number;
    /** 备注 */
    remarks?: string;
    /** 类型ID */
    typeId?: number;
  };

  type DrawbackVo = {
    /** 账户名称 */
    accountName?: string;
    /** 退款登记日期 */
    createTime?: string;
    /** 百度币 */
    currency?: number;
    /** 退款金额 */
    drawbackAmount?: number;
    /** 退款日期 */
    drawbackTime?: string;
  };

  type File = {
    absolute?: boolean;
    absoluteFile?: File;
    absolutePath?: string;
    canonicalFile?: File;
    canonicalPath?: string;
    directory?: boolean;
    executable?: boolean;
    file?: boolean;
    freeSpace?: number;
    hidden?: boolean;
    lastModified?: number;
    name?: string;
    parent?: string;
    parentFile?: File;
    path?: string;
    readable?: boolean;
    totalSpace?: number;
    usableSpace?: number;
    writable?: boolean;
  };

  type getAccountListUsingPOSTParams = {
    /** accountName */
    accountName: string;
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getAllMenusPermissionTreeUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** permissionId */
    permissionId?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getAllMenusPermissionUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getAllPermissionTreeUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getDeductionUsingGETParams = {
    /** accountName */
    accountName: string;
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
    /** typeId */
    typeId: number;
  };

  type getDeptAllUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getHomeInfoUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getPortAndSalesmanUsingGETParams = {
    /** accountName */
    accountName: string;
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getTreeUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** deptId */
    deptId?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type getUserOwnRoleUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
    /** userId */
    userId: string;
  };

  type HomeRespVO = {
    /** 目录菜单 */
    menus?: PermissionRespNode[];
    /** 授权代码 */
    permissions?: string[];
    userInfo?: UserInfoRespVO;
  };

  type importBookkeepingUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type importDrawbackUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type InputStream = true;

  type listInfoUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type LoginReqVO = {
    /** 用户密码 */
    password?: string;
    /** 登录类型(1:pc;2:App) */
    type?: string;
    /** 账号 */
    username?: string;
  };

  type LoginRespVO = {
    /** token */
    accessToken?: string;
    /** 用户id */
    id?: string;
    /** 用户所拥有的菜单权限(前后端分离返回给前端控制菜单和按钮的显示和隐藏) */
    list?: PermissionRespNode[];
    /** 电话 */
    phone?: string;
    /** 刷新token */
    refreshToken?: string;
    /** 用户名 */
    username?: string;
  };

  type loginUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type logoutUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type operationRolePermissionUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type operationUserRoleUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageDeptUserInfosUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST10Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST2Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST3Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST4Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST5Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST6Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST7Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST8Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOST9Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type pageInfoUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type PageVOAccountRespVO_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: AccountRespVO[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOBookkeepPageRespVO_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: BookkeepPageRespVO[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVODrawbackRespVO_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: DrawbackRespVO[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysDept_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysDept[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysLog_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysLog[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysPermission_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysPermission[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysPort_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysPort[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysRole_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysRole[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysSalesman_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysSalesman[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysType_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysType[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PageVOSysUser_ = {
    /** 当前页记录数 */
    curPageSize?: number;
    /** 数据列表 */
    list?: SysUser[];
    /** 当前第几页 */
    pageNum?: number;
    /** 每页记录数 */
    pageSize?: number;
    /** 总页数 */
    totalPages?: number;
    /** 总记录数 */
    totalRows?: number;
  };

  type PermissionAddReqVO = {
    /** 编码(前后端分离 前段对按钮显示隐藏控制 btn-permission-search 代表 菜单权限管理的列表查询按钮) */
    code?: string;
    /** 图标 */
    icon?: string;
    /** 请求方式 和url 配合使用 (我们用 路径匹配的方式做权限管理的时候用到) */
    method?: string;
    /** 菜单权限名称 */
    name?: string;
    /** 排序码 */
    orderNum?: number;
    /** 是否外链(0否 1 是) */
    outChain?: number;
    /** 菜单权限标识，shiro 适配restful */
    perms?: string;
    /** 父级id */
    pid?: string;
    /** 状态1:正常 0：禁用 */
    status?: number;
    /** 菜单权限类型(1:目录;2:菜单;3:按钮) */
    type?: number;
    /** 接口地址 */
    url?: string;
  };

  type PermissionPageReqVO = {
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
  };

  type PermissionRespNode = {
    /** 是否选中 默认false */
    checked?: boolean;
    children?: Record<string, any>[];
    /** 编码(前后端分离 前段对按钮显示隐藏控制 btn-permission-search 代表 菜单权限管理的列表查询按钮) */
    code?: string;
    /** 图标 */
    icon?: string;
    /** id */
    id?: string;
    /** 请求方式 和url 配合使用 (我们用 路径匹配的方式做权限管理的时候用到) */
    method?: string;
    /** 排序码 */
    orderNum?: number;
    /** 是否外链(0否 1 是) */
    outChain?: number;
    /** 菜单权限标识，shiro 适配restful */
    perms?: string;
    /** 父级id */
    pid?: string;
    /** 父级名称 */
    pidName?: string;
    /** 是否展开 默认不展开(false) */
    spread?: boolean;
    /** 菜单权限名称 */
    title?: string;
    /** 菜单权限类型(1:目录;2:菜单;3:按钮) */
    type?: number;
    /** 接口地址 */
    url?: string;
  };

  type PermissionUpdateReqVO = {
    /** 图标 */
    icon?: string;
    /** id */
    id?: string;
    /** 请求方式 和url 配合使用 (我们用 路径匹配的方式做权限管理的时候用到) */
    method?: string;
    /** 菜单权限名称 */
    name?: string;
    /** 排序码 */
    orderNum?: number;
    /** 是否外链(0否 1 是) */
    outChain?: number;
    /** 菜单权限标识，shiro 适配restful */
    perms?: string;
    /** 父级id */
    pid?: string;
    /** 状态1:正常 0：禁用 */
    status?: number;
    /** 菜单权限类型(1:目录;2:菜单;3:按钮) */
    type?: number;
    /** 接口地址 */
    url?: string;
  };

  type PortAddReqVO = {
    /** 拿到点位 */
    getPoint?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
  };

  type PortAndSalesmanRespVo = {
    aid?: number;
    /** 拿到点位 */
    getPoint?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
    /** 业务员名称 */
    salesmanName?: string;
  };

  type PortPageReqVO = {
    /** 拿到点位 */
    getPoint?: number;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
  };

  type PortUpdateReqVO = {
    /** 拿到点位 */
    getPoint?: number;
    /** 端口id */
    id?: number;
    /** 端口名称 */
    portName?: string;
    /** 端口编号 */
    portNumber?: string;
  };

  type refreshTokenUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type RegisterReqVO = {
    /** 创建来源(1.web 2.android 3.ios ) */
    createWhere?: number;
    /** 所属机构 */
    deptId?: string;
    /** 邮箱 */
    email?: string;
    /** 昵称 */
    nickName?: string;
    /** 密码 */
    password?: string;
    /** 电话 */
    phone?: string;
    /** 真实名称 */
    realName?: string;
    /** 性别(1.男 2.女)  */
    sex?: number;
    /** 账号 */
    username?: string;
  };

  type registerUsingPOSTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type Resource = {
    description?: string;
    file?: File;
    filename?: string;
    inputStream?: InputStream;
    open?: boolean;
    readable?: boolean;
    uri?: URI;
    url?: URL;
  };

  type RoleAddReqVO = {
    /** 角色描述 */
    description?: string;
    /** 角色名称 */
    name?: string;
    /** 所拥有的菜单权限 */
    permissions?: string[];
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type RolePageReqVO = {
    /** 结束时间 */
    endTime?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 角色ID */
    roleId?: string;
    /** 角色名称 */
    roleName?: string;
    /** 开始时间 */
    startTime?: string;
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type RolePermissionOperationReqVO = {
    /** 菜单权限集合 */
    permissionIds?: string[];
    /** 角色id */
    roleId?: string;
  };

  type RoleUpdateReqVO = {
    /** 角色描述 */
    description?: string;
    /** 角色id */
    id?: string;
    /** 角色名称 */
    name?: string;
    /** 所拥有的菜单权限 */
    permissions?: string[];
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type SalesmanAddReqVO = {
    /** 业务员名称 */
    salesmanName?: string;
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type SalesmanPageReqVO = {
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 业务员名称 */
    salesmanName?: string;
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type SalesmanUpdateReqVO = {
    /** 类型id */
    id?: number;
    /** 业务员名称 */
    salesmanName?: string;
    /** 状态(1:正常0:弃用) */
    status?: number;
  };

  type setUserOwnRoleUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
    /** userId */
    userId: string;
  };

  type SysDept = {
    createTime?: string;
    deleted?: number;
    deptManagerId?: string;
    deptNo?: string;
    id?: string;
    managerName?: string;
    name?: string;
    phone?: string;
    pid?: string;
    pidName?: string;
    relationCode?: string;
    status?: number;
    updateTime?: string;
  };

  type SysLog = {
    createTime?: string;
    id?: string;
    ip?: string;
    method?: string;
    operation?: string;
    params?: string;
    time?: number;
    userId?: string;
    username?: string;
  };

  type SysLogPageReqVO = {
    /** 结束时间 */
    endTime?: string;
    /** 用户操作动作 */
    operation?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 开始时间 */
    startTime?: string;
    /** 用户id */
    userId?: string;
    /** 账号 */
    username?: string;
  };

  type SysPermission = {
    code?: string;
    createTime?: string;
    deleted?: number;
    icon?: string;
    id?: string;
    method?: string;
    name?: string;
    orderNum?: number;
    outChain?: number;
    perms?: string;
    pid?: string;
    pidName?: string;
    status?: number;
    type?: number;
    updateTime?: string;
    url?: string;
  };

  type SysPort = {
    createTime?: string;
    deleted?: number;
    getPoint?: number;
    id?: number;
    portName?: string;
    portNumber?: string;
  };

  type SysRole = {
    createTime?: string;
    deleted?: number;
    description?: string;
    id?: string;
    name?: string;
    permissionRespNodes?: PermissionRespNode[];
    status?: number;
    updateTime?: string;
  };

  type SysSalesman = {
    createTime?: string;
    id?: number;
    salesmanName?: string;
    status?: number;
  };

  type SysType = {
    createTime?: string;
    deleted?: number;
    id?: number;
    sort?: number;
    typeName?: string;
  };

  type SysUser = {
    createId?: string;
    createTime?: string;
    createWhere?: number;
    deleted?: number;
    deptId?: string;
    deptName?: string;
    email?: string;
    id?: string;
    nickName?: string;
    password?: string;
    phone?: string;
    realName?: string;
    salt?: string;
    sex?: number;
    status?: number;
    updateId?: string;
    updateTime?: string;
    username?: string;
  };

  type TypeAddReqVO = {
    /** 排序 */
    sort?: number;
    /** 类型名称 */
    typeName?: string;
  };

  type TypePageReqVO = {
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 类型名称 */
    typeName?: string;
  };

  type TypeUpdateReqVO = {
    /** 类型id */
    id?: number;
    /** 排序 */
    sort?: number;
    /** 类型名称 */
    typeName?: string;
  };

  type unLoginUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateAccountUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateDeptUsingPUT1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateDeptUsingPUT2Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateDeptUsingPUT3Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateDeptUsingPUT4Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateDeptUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type UpdatePasswordReqVO = {
    /** 新密码 */
    newPwd?: string;
    /** 旧密码 */
    oldPwd?: string;
  };

  type updatePermissionUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updatePwdUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateUserInfoByIdUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateUserInfoUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateUsingPUT1Params = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type updateUsingPUTParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type URI = {
    absolute?: boolean;
    authority?: string;
    fragment?: string;
    host?: string;
    opaque?: boolean;
    path?: string;
    port?: number;
    query?: string;
    rawAuthority?: string;
    rawFragment?: string;
    rawPath?: string;
    rawQuery?: string;
    rawSchemeSpecificPart?: string;
    rawUserInfo?: string;
    scheme?: string;
    schemeSpecificPart?: string;
    userInfo?: string;
  };

  type URL = {
    authority?: string;
    content?: Record<string, any>;
    defaultPort?: number;
    deserializedFields?: URLStreamHandler;
    file?: string;
    host?: string;
    path?: string;
    port?: number;
    protocol?: string;
    query?: string;
    ref?: string;
    serializedHashCode?: number;
    userInfo?: string;
  };

  type URLStreamHandler = true;

  type UserAddReqVO = {
    /** 创建来源(1.web 2.android 3.ios ) */
    createWhere?: number;
    /** 所属机构 */
    deptId?: string;
    /** 邮箱 */
    email?: string;
    /** 密码 */
    password?: string;
    /** 手机号码 */
    phone?: string;
    /** 所拥有的角色 */
    roleIds?: string[];
    /** 性别(1.男 2.女) */
    sex?: string;
    /** 用户名 */
    username?: string;
  };

  type UserInfoRespVO = {
    /** 所属机构id */
    deptId?: string;
    /** 所属机构名称 */
    deptName?: string;
    /** 用户id */
    id?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    phone?: string;
    /** 真实姓名 */
    realName?: string;
    /** 账号 */
    username?: string;
  };

  type UserOwnRoleRespVO = {
    /** 所有角色集合 */
    allRole?: SysRole[];
    /** 用户所拥有角色集合 */
    ownRoles?: string[];
  };

  type UserPageReqVO = {
    /** 结束时间 */
    endTime?: string;
    /** 昵称 */
    nickName?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
    /** 开始时间 */
    startTime?: string;
    /** 账户状态(1.正常 2.锁定  */
    status?: number;
    /** 用户id */
    userId?: string;
    /** 账号 */
    username?: string;
  };

  type UserPageUserByDeptReqVO = {
    /** 组织id */
    deptId?: string;
    /** 第几页 */
    pageNum?: number;
    /** 分页数量 */
    pageSize?: number;
  };

  type UserRoleOperationReqVO = {
    /** 角色id集合 */
    roleIds?: string[];
    /** 用户id */
    userId?: string;
  };

  type UserUpdateReqVO = {
    /** 所属机构 */
    deptId?: string;
    /** 邮箱 */
    email?: string;
    /** 用户id */
    id?: string;
    /** 昵称 */
    nickName?: string;
    /** 密码 */
    password?: string;
    /** 手机号 */
    phone?: string;
    /** 真实名称 */
    realName?: string;
    /** 所拥有的角色 */
    roleIds?: string[];
    /** 性别(1.男 2.女) */
    sex?: number;
    /** 账户状态(1.正常 2.锁定 ) */
    status?: number;
    /** 用户名 */
    username?: string;
  };

  type youSelfInfoUsingGETParams = {
    /** swagger测试用(模拟token传入)非必填 header */
    authorization?: string;
    /** swagger测试用(模拟刷新token传入)非必填 header */
    refresh_token?: string;
  };

  type YwAccount = {
    accountName?: string;
    createName?: string;
    createTime?: string;
    deleted?: number;
    id?: number;
    portId?: number;
    remarks?: string;
    salesmanId?: number;
    status?: number;
    trade?: string;
    updateName?: string;
    updateTime?: string;
  };

  type YwBookkeeping = {
    accountId?: number;
    canalPoint?: number;
    collection?: string;
    collectionAmount?: number;
    collectionStatus?: number;
    createName?: string;
    createTime?: string;
    currency?: number;
    deductionAmount?: number;
    deductionEndStatus?: number;
    deductionStatus?: number;
    deleted?: number;
    externalPayment?: string;
    externalPaymentStatus?: number;
    externalSettlement?: number;
    getPoint?: number;
    id?: number;
    profit?: number;
    rechargeNumber?: string;
    remarks?: string;
    status?: number;
    typeId?: number;
    updateName?: string;
    updateTime?: string;
  };

  type YwDrawback = {
    accountId?: number;
    canalPoint?: number;
    createName?: string;
    createTime?: string;
    currency?: number;
    deleted?: number;
    drawbackAmount?: number;
    drawbackNumber?: string;
    drawbackStatus?: number;
    drawbackTime?: string;
    externalSettlement?: number;
    getPoint?: number;
    id?: number;
    profit?: number;
    remarks?: string;
    repeatStatus?: number;
    typeId?: number;
    updateName?: string;
    updateTime?: string;
  };
}
