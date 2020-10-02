import axios from 'axios';
import titler from '../../components/mixins/titler';
import paramQueryGenerator from '../../components/mixins/paramQueryGenerator';

export default {
  actions: {
    async getVesselsData(ctx) {
      const wholeResponse = await axios.get('http://127.0.0.1:8000/api/vessel/');
      ctx.commit('updateVessels', wholeResponse.data);
    },
    async getVesselsType(ctx) {
      const wholeResponse = await axios.get('http://127.0.0.1:8000/api/vessel-type/');
      ctx.commit('updateTypes', wholeResponse.data);
    },
    async getVesselsFlag(ctx) {
      const wholeResponse = await axios.get('http://127.0.0.1:8000/api/vessel-flag/');
      ctx.commit('updateFlags', wholeResponse.data);
    },
    async getFilteredData(ctx, queryParams = {}) {
      const path = paramQueryGenerator.methods.createParamQuery('http://127.0.0.1:8000/api/vessel/?',
        queryParams);
      const response = await axios.get(path);
      ctx.commit('updateVessels', response.data);
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
    updateTypes(state, obj) {
      state.filters.type.dict = Object.assign({}, ...obj.map((x) => ({ [x.type]: x.id })));
    },
    updateFlags(state, obj) {
      state.filters.flag.dict = Object.assign({}, ...obj.map((x) => ({ [x.flag]: x.id })));
    },
    updateFilterByType(state, val) {
      state.filters.type.dataSet = val;
      state.filters.type.enabled = true;
      state.pageNumber = 1;
    },
    updateFilterByFlag(state, val) {
      state.filters.flag.dataSet = val;
      state.filters.flag.enabled = true;
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

    filters: {
      type: {
        dataSet: [],
        dict: {},
        range: false,
        string: 'type__in=',
        title: 'Тип судна',
        enabled: false,
      },
      flag: {
        dataSet: [],
        dict: {},
        range: false,
        string: 'flag__in=',
        title: 'Флаг',
        enabled: false,
      },
      build: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['build__year__gte=', 'build__year__lte='],
        title: 'Год постройки',
        enabled: [false, false],
      },
      length: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['length__gte=', 'length__lte='],
        title: 'Длина',
        enabled: [false, false],
      },
      width: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['width__gte=', 'width__lte='],
        title: 'Ширина',
        enabled: [false, false],
      },
      grt: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['grt__gte=', 'grt__lte='],
        title: 'Грузоподъемность',
        enabled: [false, false],
      },
      dwt: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['dwt__gte=', 'dwt__lte='],
        title: 'Дедвейт',
        enabled: [false, false],
      },
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

    vesselsPaginationLength: (state, getters) => Math
      .ceil(getters.sortedVessels.length / state.perPage),

    vesselsSortKeys: (state) => state.sortKeys,

    filterKeys: (state) => state.filters,
  },
};
