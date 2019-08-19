import http from './api/public';

//token是否失效
export const refreshToken = (params, token) => {
  return http.fetchPost('/RefreshToken', params, token);
};
