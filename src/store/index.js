/**
 * store入口
 */

import Vue from 'vue';
import VueX from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './rootState';
import home from './modules/Home/home';
import exhibits from './modules/Exhibits/exhibits';
import login from './modules/Login/login';
Vue.use(VueX);

const store = new VueX.Store({
  state,
  getters: getters.getters,
  actions: actions.actions,
  mutations: mutations.mutations,
  modules: {
    home,
    exhibits,
    login
  }
});


export default store;
