import http from '../../../api/public';

//查询展业类型列表
export const getPromotionTypeList = (params) => {
  return http.fetchPost('/getPromotionTypeList', params);
};

//查询展业列表
export const getPromotionList = (params) => {
  return http.fetchPost('/getPromotionList', params);
};
