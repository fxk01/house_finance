import http from '../../../api/public';

//获取用户信息
export const myOrder = (params, token) => {
  return http.fetchPost('/myOrder', params, token);
};
