const Exhibits = () => import('../page/Exhibits/Exhibits.vue');
const Business = () => import('../page/Exhibits/Business/Business.vue');
const Poster = () => import('../page/Exhibits/Poster/Poster.vue');

export default {
  path: '/exhibits',
  name: 'Exhibits',
  component: Exhibits,
  meta: {
    title: '展业'
  },
  children: [{
    path: '/exhibits',
    name: 'Business',
    component: Business,
    meta: {
      title: '展业',
      showFooter: true
    },
  }, {
    path: '/exhibits/poster',
    name: 'Poster',
    component: Poster,
    meta: {
      title: '展业海报',
      isLogin: true,
    },
  }]
}