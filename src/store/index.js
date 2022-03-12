import { createStore } from "vuex";
import settings from "./modules/settings";
import user from "./modules/user";
import tasks from "./modules/tasks";

export default createStore({
  modules: { settings, user, tasks },
});
