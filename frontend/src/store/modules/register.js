import axios from 'axios';

export default {
  state: {
    registerURL: 'http://localhost:8000/users/',
  },

  getters: {

  },

  mutations: {
  },

  actions: {
    registerUser(ctx, payload) {
      axios.post(ctx.state.registerURL, payload)
        .then(() => {
          ctx.commit('addAlert', { text: 'Пользователь зарегистрирован!', type: 'success' });
        })
        .catch((error) => {
          ctx.commit('addAlert', {
            text: Object.values(error.response.data).map((value) => value[0]),
            type: 'error',
          });
        });
    },
  },
};
