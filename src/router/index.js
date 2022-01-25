import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import About from "@/views/About.vue";
import Upload from "@/views/Upload.vue";
import store from "@/store";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.requireAuth;
  if (requireAuth === true && store.state.user) {
    next();
  } else if (requireAuth === false && store.state.user) {
    next(Home);
  } else if (requireAuth === true && store.state.user === null) {
    next(Login);
  } else if (requireAuth === false && store.state.user === null) {
    next();
  } else if (requireAuth === undefined) {
    next();
  }
});

export default router;
