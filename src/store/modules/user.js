const state = {
  userInfo: null,
};
const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
