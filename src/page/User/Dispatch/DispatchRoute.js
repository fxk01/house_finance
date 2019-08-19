const AccountSet = () => import('./Dispatch.vue');
const DispatchList = () => import('./DispatchList/DispatchList.vue');
const DispatchDetails = () => import('./DispatchDetails/DispatchDetails.vue');
const FollowUpProcess = () => import('./FollowUpProcess/FollowUpProcess.vue');


export default {
  path: '/user/dispatch',
  name: 'Dispatch',
  component: AccountSet,
  meta: {
    title: '派单列表',
    isLogin: true
  },
  children: [{
    name: 'DispatchList',
    path: '/user/dispatch',
    component: DispatchList,
    meta: {
      title: '派单列表',
      isLogin: true
    },
  }, {
    name: 'DispatchDetails',
    path: '/user/dispatch/details',
    component: DispatchDetails,
    meta: {
      title: '派单详情',
      isLogin: true
    },
  }, {
    name: 'FollowUpProcess',
    path: '/user/dispatch/details/process',
    component: FollowUpProcess,
    meta: {
      title: '跟进处理',
      isLogin: true
    },
  }]
}
