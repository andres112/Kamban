const state = {
  todoList: [],
  progressList: [],
  doneList: [],
  pauseList: [],
  STATES: ["todo", "progress", "done", "pause"],
  currentTask: null,
};
const mutations = {
  setTasksList(state, { payload, type }) {
    switch (type) {
      case state.STATES[0]:
        state.todoList = payload || [];
        break;

      case state.STATES[1]:
        state.progressList = payload || [];
        break;

      case state.STATES[2]:
        state.doneList = payload || [];
        break;

      case state.STATES[3]:
        state.pauseList = payload || [];
        break;
    }
  },

  setCurrentTask(state, payload) {
    state.currentTask = payload;
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
