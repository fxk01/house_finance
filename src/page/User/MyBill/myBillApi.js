import http from '../../../api/public';

//获取我的提单
export const myOrderNew = (params, token) => {
  return http.fetchPost('/myOrderNew', params, token);
};

//提单搜索
export const myOrderSearch = (params, token) => {
  return http.fetchPost('/myOrderSearch', params, token);
};

//获取提单列表
export const myOrderList = (params, token) => {
  return http.fetchPost('/myOrderList', params, token);
};

//获取提单详情
export const myOrderDetail = (params, token) => {
  return http.fetchPost('/myOrderDetail', params, token);
};
