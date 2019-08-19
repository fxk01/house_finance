const Evaluation = () => import('./Evaluation.vue');
const EvaluationList = () => import('./EvaluationList/EvaluationList.vue');
const EvaluationDetails = () => import('./EvaluationDetails/EvaluationDetails.vue');

export default {
  path: '/user/evaluation',
  name: 'Evaluation',
  component: Evaluation,
  meta: {
    title: '服务评价',
    isLogin: true
  },
  children: [{
    name: 'EvaluationList',
    path: '/user/evaluation',
    component: EvaluationList,
    meta: {
      title: '服务评价',
      isLogin: true
    },
  }, {
    name: 'EvaluationDetails',
    path: '/user/evaluation/details',
    component: EvaluationDetails,
    meta: {
      title: '服务评价',
      isLogin: true
    },
  }]
}
