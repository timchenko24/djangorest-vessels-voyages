export default {
  methods: {
    createParamQuery(path, filters) {
      let local = path;
      const esc = encodeURIComponent;
      // eslint-disable-next-line no-unused-vars
      Object.entries(filters).forEach(([_, filter]) => {
        if (filter.enabled && !filter.range) {
          local += filter.string;

          local += Object.values(filter.dataSet)
            .map((k) => `${esc(filter.dict[k])}`)
            .join(',');

          local += '&';
        } else if (filter.range) {
          local += Object.keys(filter.string).map((i) => (filter.enabled[i]
            ? filter.string[i] + filter.dataSet[i] : '')).join('&');
        }
      });

      return local;
    },
  },
};
