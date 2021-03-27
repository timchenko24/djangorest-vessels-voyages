export default {
  state: {
    icons: [
      'mdi-facebook',
      'mdi-vk',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  },

  getters: {
    allIcons: (state) => state.icons,
  },
};
