export default {
  state: {
    isAuthenticated: !!localStorage.getItem('t'),
    userName: localStorage.getItem('username'),
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },

  mutations: {
    setUserName(state, name) {
      localStorage.setItem('username', name);
      state.userName = name;
    },

    removeUserName(state) {
      localStorage.removeItem('username');
      state.userName = '';
    },

    updateAuthStatus(state) {
      state.isAuthenticated = !!localStorage.getItem('t');
    },
  },
};
