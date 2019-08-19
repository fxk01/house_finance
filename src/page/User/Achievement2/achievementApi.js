import http from '../../../api/public';

//获取我的业绩
export const myAchievement = (params, token) => {
  return http.fetchPost('/myAchievement', params, token);
};
