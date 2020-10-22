import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '../../router';

export default {
  state: {
    jwt: localStorage.getItem('t'),
    endpoints: {
      obtainJWT: 'http://localhost:8000/auth/obtain_token/',
      refreshJWT: 'http://localhost:8000/auth/refresh_token/',
    },
  },

  getters: {

  },

  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('t', newToken);
      state.jwt = newToken;
    },

    removeToken(state) {
      localStorage.removeItem('t');
      state.jwt = null;
    },
  },

  actions: {
    obtainToken(ctx, payload) {
      axios.post(ctx.state.endpoints.obtainJWT, payload)
        .then((response) => {
          ctx.commit('updateToken', response.data.token);
          ctx.commit('setUserName', payload.username);
          ctx.commit('updateAuthStatus');
          ctx.commit('addAlert', { text: 'Вход выполнен', type: 'success' });
          setTimeout(() => router.push('/'), 1500);
        })
        .catch((error) => {
          ctx.commit('addAlert', {
            text: Object.values(error.response.data).map((value) => value[0]),
            type: 'error',
          });
        });
    },

    refreshToken(ctx) {
      const payload = {
        token: ctx.state.jwt,
      };
      axios.post(ctx.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token);
        })
        .catch((error) => {
          ctx.commit('addAlert', {
            text: Object.values(error.response.data).map((value) => value[0]),
            type: 'error',
          });
        });
    },

    inspectToken(ctx) {
      const token = ctx.state.jwt;
      if (token) {
        const decoded = jwtDecode(token);
        const { exp } = decoded;
        const { origIat } = decoded;
        if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - origIat < 628200) {
          ctx.dispatch('refreshToken');
        } else if (exp - (Date.now() / 1000) < 1800) {
          // DO NOTHING, DO NOT REFRESH
        } else {
          ctx.commit('removeToken');
          this.$router.push('LoginIndex');
        }
      }
    },
  },
};
