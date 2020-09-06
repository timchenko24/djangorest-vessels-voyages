export default {
  data() {
    return {
      pageNumber: 1,
      perPage: 6,
    };
  },

  methods: {
    paginationLength(originalData) {
      return Math.ceil(originalData.length / this.perPage);
    },
  },
};
