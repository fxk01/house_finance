import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "@babel/polyfill"
import myAxios from './api/public'
import 'amfe-flexible'
import VueScroller from 'vue-scroller'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueCookies from 'vue-cookie'
import vueToTop from 'vue-totop'
import {
  Button,
  Tabbar,
  TabbarItem,
  Icon,
  NavBar,
  Collapse,
  CollapseItem,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Popup,
  DatetimePicker,
  Rate,
  Checkbox,
  CheckboxGroup,
  Toast,
  PullRefresh,
  List,
  Field,
  Dialog,
  RadioGroup,
  Radio,
  CellGroup,
  Actionsheet,
  Picker,
  Lazyload,
  Progress,
} from 'vant';
import 'vant/lib/icon/local.css';

Vue.prototype.$axios = myAxios;
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Validator.locale = 'en' ? 'zh_CN' : 'en';
Validator.localize(Validator.locale, {
  // zh_CN.messages
  messages: {
    required:(field) => `${field}不能为空！`,
    numeric:(field) => `${field}只能为数字！`
    // is_not: (field)=> `${field}不一致！`,
  },
  attributes:{
    loginName:'登录名',
    loginPassword:'密码'
  },
});

Vue.use(vueToTop);
Vue.use(VueScroller);
Vue.use(VueCookies);
Vue.use(Button);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Tabbar).use(TabbarItem);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Rate);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Toast);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(CellGroup);
Vue.use(Actionsheet);
Vue.use(Picker);
Vue.use(Lazyload,{
  preLoad: 0.8,
  attempt: 3
});
Vue.use(Progress);

Validator.extend('mobile', {
  getMessage:() => '请输入正确的手机号码！',
  validate:(value) => {
    const reg = /^[1][0-9][0-9]{9}$/;
    return reg.test(value)
  }
});

new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
