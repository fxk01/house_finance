import http from '../../../api/public';

//获取我的名片
export const myCard = (params, token) => {
  return http.fetchPost('/myCard', params, token);
};
