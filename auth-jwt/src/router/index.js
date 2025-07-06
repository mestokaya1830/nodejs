import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/login.vue')
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('@/views/register.vue')
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});

export default router;