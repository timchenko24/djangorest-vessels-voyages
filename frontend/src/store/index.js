import Vue from 'vue';
import Vuex from 'vuex';
import vessels from './modules/vessels';
import voyages from './modules/voyages';
import main from './modules/main';
import register from './modules/register';
import login from './modules/login';
import user from './modules/user';
import footer from './modules/footer';
import dashboard from './modules/dashboard';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vessels, voyages, main, register, login, user, footer, dashboard,
  },
});
