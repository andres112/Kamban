import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { navbar: false },
  },
  {
    path: "/main",
    name: "Kamban",
    component: () =>
      import(/* webpackChunkName: "kamban" */ "../views/Kamban.vue"),
    meta: { navbar: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { navbar: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: { navbar: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// control of the navbar visibility
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.navbar)) {
    store.commit("settings/changeNavbarVisible", true);
  } else {
    store.commit("settings/changeNavbarVisible", false);
  }
  next();
});

export default router;
