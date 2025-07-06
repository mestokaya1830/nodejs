import { createRouter, createWebHistory } from "vue-router";
import ClientLayout from "../views/layouts/client.vue";
import AdminLayout from "../views/layouts/admin.vue";

import store from "@/store";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "client-layout",
      component: ClientLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("../views/client/index.vue"),
          meta: { title: "Home" },
        },
        {
          path: "/:user/posts",
          name: "user-posts",
          component: () => import("../views/client/user-posts.vue"),
          meta: { title: "Posts" },
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/client/about.vue"),
          meta: { title: "About" },
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("../views/client/contact.vue"),
          meta: { title: "About" },
        },
        {
          path: "/:user/post/:id",
          name: "post-details",
          component: () => import("../views/client/details.vue"),
          meta: { title: "Post Details" },
        },
        {
          path: "/register",
          name: "register",
          component: () => import("../views/auth/register.vue"),
          meta: { title: "Register" },
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/auth/login.vue"),
          meta: { title: "Login" },
        },
        {
          path: "/email-verfication",
          name: "email-verfication",
          component: () => import("../views/auth/email-verfication.vue"),
          meta: { title: "Email Verfication" },
        },
        {
          path: "/reset-password/:id",
          name: "reset-password",
          component: () => import("../views/auth/reset-password.vue"),
          meta: { title: "Reset Password" },
        },
      ],
    },
    {
      path:'/admin',
      name: 'admin-layout',
      component: AdminLayout,
      beforeEnter: (to, from, next) => {
        if (!store.state.auth) {
          next({ path: "/" });
        } else {
          next();
        }
      },
      children:[
        {
          path: "/admin",
          name: "admin",
          component: () => import("../views/admin/index.vue"),
          meta: { title: "Admin" },
          
        },
        {
          path: "/admin/create",
          name: "admin-create",
          component: () => import("../views/admin/create.vue"),
          meta: { title: "Posts" },
        },
        {
          path: "/admin/post/:id",
          name: "admin-post-details",
          component: () => import("../views/admin/details.vue"),
          meta: { title: "Post Details" },
        },
        {
          path: "/admin/post/edit/:id",
          name: "admin-post-edit",
          component: () => import("../views/admin/edit.vue"),
          meta: { title: "Post Edit" },
        },
      ]
    },
    {
      path: "/:catchAll(.*)",
      name: "notfound",
      component: () => import("../views/client/notFound.vue"),
    },
  ],
});

export default router;
