export default {
  state: {
    status: '',
    mobile: JSON.parse(localStorage.getItem('mobile')) || ''
  },
  mutations: {
    changeStatus(state, value) {
      state.status = value
    },
    changeMobile(state,value) {
      state.mobile = value;
      localStorage.setItem('mobile',value);
    }
    
  }
}
