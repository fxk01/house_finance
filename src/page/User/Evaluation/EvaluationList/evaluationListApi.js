import http from '../../../../api/public';

//获取服务评价列表
export const serviceCommentList = (params, token) => {
  return http.fetchPost('/serviceCommentList', params, token);
};
