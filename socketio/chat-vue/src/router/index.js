import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/Users.vue')
    }
  ]
})

export default router
