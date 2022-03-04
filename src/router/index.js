import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
import { currentUser } from "@/firebase.js";

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
    meta: { navbar: true, requieresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: { navbar: true, requieresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    meta: { navbar: true, requieresAuth: true },
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

  const user = await currentUser();
  console.log(user);
  if (to.matched.some((record) => record.meta.requieresAuth) && !user) {
    next("/");
  }
  //TODO: commit user to state "user"
  //store.commit("user/setUser", user.providerData[0]);
  next();
});

export default router;
