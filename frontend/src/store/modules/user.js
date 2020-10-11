export default {
  state: {
    isAuthenticated: !!localStorage.getItem('t'),
    userName: '',
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },

  mutations: {
    setUserName(state, name) {
      state.userName = name;
    },

    updateAuthStatus(state) {
      state.isAuthenticated = !!localStorage.getItem('t');
    },
  },
};
