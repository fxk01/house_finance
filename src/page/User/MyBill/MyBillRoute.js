const MyBill = () => import('./MyBill.vue');
const Home = () => import('./Home/Home.vue');
const List = () => import('./List/List.vue');
const Detail = () => import('./Detail/Detail.vue');

export default {
  path: '/user/mb',
  name: 'MyBill',
  component: MyBill,
  meta: {
    title: '我的提单',
    isLogin: true
  },
  children: [{
    name: 'MyBillHome',
    path: '/user/mb',
    component: Home,
    meta: {
      title: '我的提单',
      isLogin: true
    },
  }, {
    name: 'List',
    path: '/user/mb/list',
    component: List,
    meta: {
      title: '提单列表',
      isLogin: true
    },
  }, {
    name: 'Detail',
    path: '/user/mb/list/detail',
    component: Detail,
    meta: {
      title: '提单详情',
      isLogin: true
    },
  }]
}
