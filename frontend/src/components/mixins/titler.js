export default {
  methods: {
    setTitles(arr, titles, exclude) {
      const titledArray = [];
      arr.forEach((obj) => {
        const iter = titles[Symbol.iterator]();
        const temp = {};
        Object.keys(obj).forEach((key) => {
          if (!exclude.includes(key)) {
            Object.assign(temp, {
              [key]: {
                value: obj[key],
                title: iter.next(),
              },
            });
          }
        });
        titledArray.push(temp);
      });
      return titledArray;
    },
  },
};
