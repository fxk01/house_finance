import http from '../../../api/public';

//获取用户信息
export const getUserInfo = (params, token) => {
  return http.fetchPost('/getUserInfo', params, token);
};
