import http from '../../../api/public';

//获取红包记录列表
export const redPacket = (params, token) => {
  return http.fetchPost('/redPacket', params, token);
};

//获取入账记录列表
export const accountEntry = (params, token) => {
  return http.fetchPost('/accountEntry', params, token);
};
