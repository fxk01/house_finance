import http from '../../../../api/public';

//更改手机号码
export const accountSettings = (params, token) => {
  return http.fetchPost('/accountSettings', params, token);
};
