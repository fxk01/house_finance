import http from '../../../api/public';

//获取我的推单
export const myPushOrder = (params, token) => {
  return http.fetchPost('/myPushOrder', params, token);
};

//获取我的抢单
export const myGrabOrder = (params, token) => {
  return http.fetchPost('/myGrabOrder', params, token);
};

//拨号接口
// export const callPhone = (params, token) => {
//   return http.fetchPost('/callPhone', params, token);
// };

//共享订单操作
export const shareOrderOperate = (params, token) => {
  return http.fetchPost('/shareOrderOperate', params, token);
};
