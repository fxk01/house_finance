import http from '../../../api/public';

//获取角色说明
export const userRoleDetail = (params, token) => {
  return http.fetchPost('/userRoleDetail', params, token);
};
