import http from '../../../api/public';

//获取用户信息
export const capitalFlow = (params, token) => {
  return http.fetchPost('/capitalFlow', params, token);
};
