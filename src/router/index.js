import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Meeting from "../views/Meeting.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/meeting/:id",
    name: "Meeting",
    component: Meeting,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
