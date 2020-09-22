import Vue from 'vue';
import Vuex from 'vuex';
import vessels from './modules/vessels';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    vessels,
  },
});
