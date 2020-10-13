import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/vessels',
    name: 'VesselIndex',
    component: () => import('../views/vessels/Index.vue'),
  },
  {
    path: '/ports',
    name: 'PortIndex',
    component: () => import('../views/ports/Index.vue'),
  },
  {
    path: '/routes',
    name: 'RouteIndex',
    component: () => import('../views/routes/Index.vue'),
  },
  {
    path: '/voyages',
    name: 'VoyageIndex',
    component: () => import('../views/voyages/Index.vue'),
  },
  {
    path: '/register',
    name: 'RegisterIndex',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'LogoutIndex',
    component: () => import('../views/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'DashboardIndex',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];


const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
