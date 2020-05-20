import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Index from '../views/vessels/Index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vessels',
    name: 'Index',
    component: Index,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
