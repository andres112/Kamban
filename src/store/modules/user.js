const state = {
  userInfo: null,
  userToken: null,
};
const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload;
  },
  setUserToken(state, payload) {
    state.userToken = payload;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
