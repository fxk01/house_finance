const CashCard = () => import('./CashCard.vue');
const WithdrawalCard = () => import('./WithdrawalCard/WithdrawalCard.vue');
const RealNameCard = () => import('./RealNameCard/RealNameCard.vue');

export default {
  path: '/user/cash',
  name: 'CashCard',
  component: CashCard,
  meta: {
    title: '提现银行卡',
    isLogin: true
  },
  children: [{
    path: '/user/cash',
    name: 'WithdrawalCard',
    component: WithdrawalCard,
    meta: {
      title: '提现银行卡',
      isLogin: true
    },
  }, {
    path: '/user/cash/certification',
    name: 'RealNameCard',
    component: RealNameCard,
    meta: {
      title: '绑卡实名认证',
      isLogin: true
    },
  }]
}
