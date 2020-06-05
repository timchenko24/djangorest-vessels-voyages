import Vue from 'vue';
import VueRouter from 'vue-router';

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
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
