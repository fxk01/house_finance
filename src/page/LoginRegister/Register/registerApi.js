import http from '../../../api/public';

//发送验证码
export const sendSms = (params) => {
  return http.fetchPost('/sendSms', params)
};

//注册
export const register = (params) => {
  return http.fetchPost('/register', params)
};
