const state = {
  navbar: { isVisible: false },
  darkMode: false,
  alertNotification: {},
  isMobile: false,
};
const mutations = {
  changeNavbarVisible(state, value) {
    state.navbar.isVisible = value;
  },
  setDarkMode(state, value) {
    state.darkMode = value;
  },
  setAlertNotification(state, payload) {
    state.alertNotification = {
      text: payload?.text,
      position: payload?.position,
      type: payload?.type,
    };
  },
  setMobile(state, value) {
    state.isMobile = value;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
