import http from '../../../api/public';

//获取我的业绩
export const myAchievementNew = (params, token) => {
  return http.fetchPost('/myAchievementNew', params, token);
};

//获取下级人数
export const myPartnerNew = (params, token) => {
  return http.fetchPost('/myPartnerNew', params, token);
};

//获取佣金详情
export const myCommissionNew = (params, token) => {
  return http.fetchPost('/myCommissionNew', params, token);
};

//用户首次显示查看下级提单详情
export const achievementTipRead = (params, token) => {
  return http.fetchPost('/achievementTipRead', params, token);
};
