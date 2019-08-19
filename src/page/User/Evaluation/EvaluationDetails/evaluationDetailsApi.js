import http from '../../../../api/public';

//获取服务评价详情
export const serviceCommentDetail = (params, token) => {
  return http.fetchPost('/serviceCommentDetail', params, token);
};

//提交服务评价
export const serviceComment = (params, token) => {
  return http.fetchPost('/serviceComment', params, token);
};
