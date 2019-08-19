import http from '../../../api/public';

//获取最新消息
export const getStationMessage = (params, token) => {
  return http.fetchPost('/messageNotification', params, token);
};

//查看是否填写共享订单
export const getOrderInfo = (params, token) => {
  return http.fetchPost('/getOrderInfo', params, token);
};
