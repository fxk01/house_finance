import http from '../../../api/public';

//提现页面
export const toWithdrawal = (params, token) => {
  return http.fetchPost('/toWithdrawal', params, token);
};

//获取我的银行卡信息
export const myBankCard = (params, token) => {
  return http.fetchPost('/myBankCard', params, token);
};

//提现
export const withdrawal = (params, token) => {
  return http.fetchPost('/withdrawal', params, token);
};

//获取提现记录
export const withdrawalList = (params, token) => {
  return http.fetchPost('/withdrawalList', params, token);
};

//获取提现详情
export const withdrawalDetail = (params, token) => {
  return http.fetchPost('/withdrawalDetail', params, token);
};

//添加对公账户接口
export const addPublicAccount = (params, token) => {
  return http.fetchPost('/addPublicAccount', params, token);
};

//判断第一次对公是否显示到账方式说明
export const publicAccountTip = (params, token) => {
  return http.fetchPost('/publicAccountTip', params, token);
};
