import axios from 'axios';
import titler from '../../components/mixins/titler';

export default {
  actions: {
    async getVesselsData(ctx, queryParam = '') {
      const wholeResponse = await axios.get(`http://127.0.0.1:8000/api/vessel/${queryParam}`);
      ctx.commit('updateVessels', wholeResponse.data);
    },
  },
  mutations: {
    updateVessels(state, vessels) {
      state.vessels = vessels;
    },
    updatePageNumber(state, number) {
      state.pageNumber = number;
    },
    updateSearchStr(state, str) {
      state.searchStr = str;
      state.pageNumber = 1;
    },
    updateBySort(state, obj) {
      state.sortObj = obj;
      state.pageNumber = 1;
    },
  },
  state: {
    vessels: [],
    titles: ['MMSI', 'Тип', 'Флаг', 'Год постройки', 'Название', 'IMO', 'Позывной', 'Длина',
      'Ширина', 'Грузоподъемность', 'Дедвейт'],

    pageNumber: 1,
    perPage: 6,

    searchStr: '',

    sortKeys: {
      name: {
        title: 'Название',
        isString: true,
      },
      type: {
        title: 'Тип',
        isString: true,
      },
      flag: {
        title: 'Флаг',
        isString: true,
      },
      build: {
        title: 'Год постройки',
        isString: false,
      },
      length: {
        title: 'Длина',
        isString: false,
      },
      width: {
        title: 'Ширина',
        isString: false,
      },
      grt: {
        title: 'Грузоподъемность',
        isString: false,
      },
      dwt: {
        title: 'Дедвейт',
        isString: false,
      },
    },
    sortObj: {
      key: 'name',
      isString: true,
      sortByDesc: false,
    },
  },
  getters: {
    allVessels: (state) => state.vessels,

    titledVessels: (state) => titler.methods.setTitles(state.vessels, state.titles, []),

    searchedVessels: (state, getters) => getters.titledVessels.filter((item) => item.name.value
      .toLowerCase().indexOf(state.searchStr.toLowerCase()) !== -1),

    sortedVessels: (state, getters) => {
      const arr = [...getters.searchedVessels];
      const sortTextFieldsFn = (a, b) => {
        let compare = 0;
        const f1 = a[state.sortObj.key].value.toLowerCase();
        const f2 = b[state.sortObj.key].value.toLowerCase();
        if (f1 > f2) {
          compare = 1;
        } else if (f2 > f1) {
          compare = -1;
        }
        return compare;
      };
      if (state.sortObj.sortByDesc) {
        if (state.sortObj.isString) {
          arr.sort(sortTextFieldsFn);
          arr.reverse();
        }
        arr.sort((a, b) => b[state.sortObj.key].value
          - a[state.sortObj.key].value);
      } else {
        if (state.sortObj.isString) {
          arr.sort(sortTextFieldsFn);
        }
        arr.sort((a, b) => a[state.sortObj.key].value
          - b[state.sortObj.key].value);
      }
      return arr;
    },

    paginatedVessels: (state, getters) => getters.sortedVessels.slice((state.pageNumber - 1)
      * state.perPage, state.pageNumber * state.perPage),

    paginationLength: (state, getters) => Math.ceil(getters.sortedVessels.length / state.perPage),

    sortKeys: (state) => state.sortKeys,
  },
};
