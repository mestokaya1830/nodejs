import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{title:'Home'}
  },
  {
    path: "/githubprofile",
    name:'Github Profile',
    component: () => import('@/views/GithubProfile.vue'),
    meta:{title:'Github Profile'}
  },
  {
    path: "/googleprofile",
    name:'Google Profile',
    component: () => import('@/views/GoogleProfile.vue'),
    meta:{title:'Google Profile'}
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;