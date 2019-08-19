import VueCookies from 'vue-cookie';
const state = {
  userPhoneData: {},
  userData: {
    token: VueCookies.get('token') || '',
    isAuth: VueCookies.get('isAuth') || false,
    uid: VueCookies.get('uid')||'',
  },
  // shareURL:'http://lodev.hsfinance.cn/#/',
  shareURL:'https://fj.shangaofangjin.com/#/'
};
export default state;
