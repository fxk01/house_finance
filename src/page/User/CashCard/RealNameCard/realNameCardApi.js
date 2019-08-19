import http from '../../../../api/public';

//获取银行列表
export const toAddBankCard = (params, token) => {
  return http.fetchPost('/toAddBankCard', params, token);
};

//绑卡验证码
export const sendSms = (params, token) => {
  return http.fetchPost('/sendSms', params, token);
};

//根据银行卡号确定所属银行
export const getBankCardBin = (params, token) => {
  return http.fetchPost('/getBankCardBin', params, token);
};

//绑卡
export const addBankCard = (params, token) => {
  return http.fetchPost('/addBankCard', params, token);
};
