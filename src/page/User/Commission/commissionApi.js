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
