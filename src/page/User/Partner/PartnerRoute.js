const Partner = () => import('./Partner.vue');
const Housing = () => import('./OncePartner/OncePartner.vue');
const Result = () => import('./Result/Result.vue');

export default {
  name: 'Partner',
  path: '/user/partner',
  component: Partner,
  meta: {
    title: '我的邀请',
    isLogin: true
  },
  children: [{
    name: 'OncePartner',
    path: '/user/partner',
    component: Housing,
    meta: {
      title: '我的邀请',
      isLogin: true
    },
  }, {
    name: 'Result',
    path: '/user/partner/result',
    component: Result,
    meta: {
      title: '邀请结果',
      isLogin: true
    },
  }]
}
