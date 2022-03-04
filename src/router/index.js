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

router.beforeEach(async (to, from, next) => {
  const user = await currentUser();
  console.log(user);
  if (to.matched.some((record) => record.meta.requieresAuth) && !user) {
    next("/");
  }
  // update user information
  store.commit("user/setUserInfo", user ? user.providerData[0] : user);

  // control of the navbar visibility
  store.commit(
    "settings/changeNavbarVisible",
    to.matched.some((record) => record.meta.navbar)
  );
  next();
});

export default router;
