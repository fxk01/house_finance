const AboutHousing = () => import('./AboutHousing.vue');
const Housing = () => import('./Housing/Housing.vue');

export default {
  name: 'AboutHousing',
  path: '/user/housing',
  component: AboutHousing,
  meta: {
    title: '关于房金',
    isLogin: true
  },
  children: [{
    name: 'Housing',
    path: '/user/housing',
    component: Housing,
    meta: {
      title: '关于房金',
      isLogin: true
    },
  },]
}
