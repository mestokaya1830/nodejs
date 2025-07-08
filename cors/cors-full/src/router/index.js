import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{title:'Home'}
  },
  {
    path: "/about",
    name:'About',
    component: () => import('../views/About.vue'),
    meta:{title:'About'}
  },
  {
    path: "/contact",
    name:'Contact',
    component: () => import('../views/Contact.vue'),
    meta:{title:'Contact'}
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('../views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;