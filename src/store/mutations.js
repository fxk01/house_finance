export const mutations = {
  sendCodeFormation(state, json) {
    Object.assign(state.userPhoneData, json);
  },
};
