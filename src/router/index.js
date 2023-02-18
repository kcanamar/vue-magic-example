import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Import the vuex sotre
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ 
    '../views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Security Middleware
router.beforeEach((to, from, next) => {
  // check the store for logged in user
  const loggedIn = store.state.user;
  // checks which routes require authentication provided by the meta object and requiresAuth set to true
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // if the route is protected and the user is not logged in redirect to the login page
  if (requiresAuth && !loggedIn) {
    next('/login');
  }
  // else procced
  next();
})

export default router
