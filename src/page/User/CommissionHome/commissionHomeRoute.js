const CommissionHome = () => import('./CommissionHome.vue');
const Commission = () => import('./Commission/Commission2.vue');
const WithdrawalsRecord = () => import('./WithdrawalsRecord/WithdrawalsRecord.vue');
const CashDetail = () => import('./CashDetail/CashDetail.vue');
const UserAgree = () => import('./UserAgree/UserAgree.vue');

export default {
  name: 'CommissionHome',
  path: '/user/commission',
  component: CommissionHome,
  meta: {
    title: '提现',
    isLogin: true
  },
  children: [{
    name: 'Commission',
    path: '/user/commission',
    component: Commission,
    meta: {
      title: '提现',
      isLogin: true
    },
  }, {
    name: 'WithdrawalsRecord',
    path: '/user/commission/record',
    component: WithdrawalsRecord,
    meta: {
      title: '提现记录',
      isLogin: true
    },
  }, {
    name: 'CashDetail',
    path: '/user/commission/record/detail',
    component: CashDetail,
    meta: {
      title: '提现详情',
      isLogin: true
    },
  }, {
    name: 'UserAgree',
    path: '/user/commission/agree',
    component: UserAgree,
    meta: {
      title: '账户协议',
      isLogin: true
    },
  }]
}
