import Vue from 'vue'
import Router from 'vue-router'
import loginRoute from './login'
import userRoute from './user'
import homeRoute from './home'
import drillRoute from './drill'
import exhibits from './exhibits'
import VueWeChatTitle from 'vue-wechat-title'
import VueCookies from 'vue-cookie'
import { mixin } from '../utils/common';

import * as appApi from "../appApi"
import vueG from 'vueg'
import { Toast } from 'vant';
Vue.use(Toast);

const footNameArr = [{
    name: 'homePage',
    active: 0
  }, {
    name: 'Business',
    active: 1
  }, {
    name: 'UserPage',
    active: 2
  },
];
Vue.use(Router);

// {
//   name: 'Drill',
//     active: 2
// },

const router = new Router({
  // mode: 'history',
  routes: [
    loginRoute,
    userRoute,
    homeRoute,
    drillRoute,
    exhibits
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

Vue.use(VueWeChatTitle);
Vue.use(vueG, router, {
  shadow: false,
  // disableAtSameDepths: true,
});

router.beforeEach((to, from, next) => {
  if (to.path) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  if(to.name=='login' && from.name!='register'){
    sessionStorage.setItem('referrer',from.path) //储存来源路由
  }
  // const token = VueCookies.get('token');
  footNameArr.forEach((item) => {
    if(to.name.indexOf(item.name) >= 0) {
      to.meta.active = item.active
    }
  });


  if(to.meta.isLogin) {
    let uToken = VueCookies.get('token');
    if(!uToken){
      router.push({name:'login'});
      return;
    }
  }
  if(to.meta.isAuth) {
    if(VueCookies.get('isAuth')==='false'){
      Toast('您暂未实名认证，为了您的权益，请先实名认证');
      router.push('/user/cash/certification?opType=1');
      return;
    }
  }
  if(to.name === 'MyBillHome' && to.query['source'] === 'achievement') {
    to.meta.title = '我的提单(包含下级)'
  } else if(to.name === 'MyBillHome') {
    to.meta.title = '我的提单(不包含下级)'
  }

  if(to.name === 'CommissionDetail' && to.query['isReferrerUser'] === '0') {
    to.meta.title = '佣金详情(不包含下级)'
  } else if(to.name === 'CommissionDetail') {
    to.meta.title = '佣金详情(包含下级)'
  }

  // if(to.name == 'productBrief'){
  //   to.meta.title = JSON.parse(localStorage.getItem("p_info")).p_name + '介绍';
  // }
  // if(to.name == 'subOrderA'){
  //   to.meta.title = JSON.parse(localStorage.getItem("p_info")).p_name + '提单';
  // }
  if(to.name == 'banner'){
    to.meta.title = localStorage.getItem("title").replace(/"/g,'');
  }
  next();
});

export default router;
