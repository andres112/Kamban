const state = {
  userInfo: null,
  userToken: null,
  userId: null,
};
const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = !payload ? null : { ...state.userInfo, ...payload };
  },
  setUserToken(state, payload) {
    state.userToken = payload;
  },
  setUserId(state, payload) {
    state.userId = payload;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
