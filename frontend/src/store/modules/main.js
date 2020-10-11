
export default {
  state: {
    alerts: [],
  },

  getters: {
    allAlerts: (state) => state.alerts,
  },

  mutations: {
    addAlert(state, newAlert) {
      state.alerts = [];
      state.alerts.push(newAlert);
    },
  },
};
