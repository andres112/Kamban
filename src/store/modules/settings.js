const state = {
  navbar: { isVisible: false },
  darkMode: false,
};
const mutations = {
  changeNavbarVisible(state, value) {
    state.navbar.isVisible = value;
  },
  setDarkMode(state, value) {
    state.darkMode = value;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
