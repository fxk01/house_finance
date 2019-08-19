import http from '../../../api/public';

//获取我的合伙人
export const myPartner = (params, token) => {
  return http.fetchPost('/myPartner', params, token);
};

//发送分享内容
export const shareMyInvitation = (params, token) => {
  return http.fetchPost('/shareMyInvitation', params, token);
};

//发送我的名片
export const weChatConfig = (params, token) => {
  return http.fetchGet('/weChatConfig', params, token);
};
