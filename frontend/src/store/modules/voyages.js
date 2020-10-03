import axios from 'axios';
import titler from '../../components/mixins/titler';
import paramQueryGenerator from '../../components/mixins/paramQueryGenerator';

export default {
  actions: {
    async getVoyagesData(ctx) {
      const wholeResponse = await axios.get('http://127.0.0.1:8000/api/voyage/');
      ctx.commit('updateVoyages', wholeResponse.data);
    },
    async getVesselsData(ctx) {
      const response = await axios.get('http://localhost:8000/api/vessel/');
      ctx.commit('updateVessels', response.data);
    },
    async getRoutesData(ctx) {
      const response = await axios.get('http://localhost:8000/api/route/');
      ctx.commit('updateRoutes', response.data);
    },
    async getFilteredData(ctx, queryParams = {}) {
      const path = paramQueryGenerator.methods.createParamQuery('http://127.0.0.1:8000/api/voyage/?',
        queryParams);
      const response = await axios.get(path);
      ctx.commit('updateVoyages', response.data);
    },
  },
  mutations: {
    updateVoyages(state, voyages) {
      state.voyages = voyages;
    },
    updatePageNumber(state, number) {
      state.pageNumber = number;
    },
    updateBySort(state, obj) {
      state.sortObj = obj;
      state.pageNumber = 1;
    },
    updateSearchStr(state, str) {
      state.searchStr = str;
      state.pageNumber = 1;
    },
    updateVessels(state, vessels) {
      state.filters.vessel.dict = Object.assign({}, ...vessels.map((x) => ({ [x.name]: x.mmsi })));
    },
    updateRoutes(state, routes) {
      state.filters.route.dict = Object.assign({}, ...routes
        .map((x) => ({ [`${x.departure_port} - ${x.destination_port}`]: x.id })));
    },
    updateFilterByVessel(state, val) {
      state.filters.vessel.dataSet = val;
      state.filters.vessel.enabled = true;
      state.pageNumber = 1;
    },
    updateFilterByRoute(state, val) {
      state.filters.route.dataSet = val;
      state.filters.route.enabled = true;
      state.pageNumber = 1;
    },
  },
  state: {
    voyages: [],
    titles: ['Маршрут', 'Судно', 'Дата отбытия', 'Дата прибытия', 'Время в порту (час)', 'Затраты на топливо ($)',
      'Затраты на экипаж ($)', 'Портовые расходы ($)', 'Расходы на страхование ($)', 'Сумма расходов ($)',
      'Доход от перевозки груза ($)', 'Чистый суммарный фрахт ($)', 'Прибыль за рейс ($)'],

    pageNumber: 1,
    perPage: 6,

    searchStr: '',

    sortKeys: {
      route: {
        title: 'Маршрут',
        isString: true,
      },
      mmsi: {
        title: 'Судно',
        isString: true,
      },
      time_in_port: {
        title: 'Время в порту (час)',
        isString: false,
      },
      fuel_costs: {
        title: 'Затраты на топливо ($)',
        isString: false,
      },
      crew_costs: {
        title: 'Затраты на экипаж ($)',
        isString: false,
      },
      port_charges: {
        title: 'Портовые расходы ($)',
        isString: false,
      },
      insurance_costs: {
        title: 'Расходы на страхование ($)',
        isString: false,
      },
      total_costs: {
        title: 'Сумма расходов ($)',
        isString: false,
      },
      cargo_income: {
        title: 'Доход от перевозки груза ($)',
        isString: false,
      },
      net_total_freight: {
        title: 'Чистый суммарный фрахт ($)',
        isString: false,
      },
      voyage_profit: {
        title: 'Прибыль за рейс ($)',
        isString: false,
      },
    },
    sortObj: {
      key: 'route',
      isString: true,
      sortByDesc: false,
    },

    filters: {
      route: {
        dataSet: [],
        dict: {},
        range: false,
        string: 'route__in=',
        title: 'Маршрут',
        enabled: false,
      },
      vessel: {
        dataSet: [],
        dict: {},
        range: false,
        string: 'mmsi__in=',
        title: 'Судно',
        enabled: false,
      },
      // departure_date: {
      //   dataSet: [],
      //   dict: {},
      //   range: false,
      //   string: 'departure_date__in=',
      //   title: 'Дата отправления',
      //   enabled: false,
      // },
      // arrival_date: {
      //   dataSet: [],
      //   dict: {},
      //   range: false,
      //   string: 'arrival_date__in=',
      //   title: 'Дата отправления',
      //   enabled: false,
      // },
      time_in_port: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['time_in_port__gte=', 'time_in_port__lte='],
        title: 'Время в порту',
        enabled: [false, false],
      },
      fuel_costs: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['fuel_costs__gte=', 'fuel_costs__lte='],
        title: 'Затраты на топливо',
        enabled: [false, false],
      },
      crew_costs: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['crew_costs__gte=', 'crew_costs__lte='],
        title: 'Затраты на экипаж',
        enabled: [false, false],
      },
      port_charges: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['port_charges__gte=', 'port_charges__lte='],
        title: 'Портовые расходы',
        enabled: [false, false],
      },
      insurance_costs: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['insurance_costs__gte=', 'insurance_costs__lte='],
        title: 'Затраты на страховку',
        enabled: [false, false],
      },
      total_costs: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['total_costs__gte=', 'total_costs__lte='],
        title: 'Сумма затрат',
        enabled: [false, false],
      },
      cargo_income: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['cargo_income__gte=', 'cargo_income__lte='],
        title: 'Доход от перевозки груза',
        enabled: [false, false],
      },
      net_total_freight: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['net_total_freight__gte=', 'net_total_freight__lte='],
        title: 'Чистый суммарный фрахт',
        enabled: [false, false],
      },
      voyage_profit: {
        dataSet: [],
        dict: {},
        range: true,
        limits: [],
        string: ['voyage_profit__gte=', 'voyage_profit__lte='],
        title: 'Прибыль за рейс',
        enabled: [false, false],
      },
    },
  },
  getters: {
    allVoyages: (state) => state.voyages,

    titledVoyages: (state) => titler.methods.setTitles(state.voyages, state.titles, ['id']),

    searchedVoyages: (state, getters) => getters.titledVoyages.filter((item) => item.route.value
      .toLowerCase().indexOf(state.searchStr.toLowerCase()) !== -1),

    sortedVoyages: (state, getters) => {
      const arr = [...getters.searchedVoyages];
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

    paginatedVoyages: (state, getters) => getters.sortedVoyages.slice((state.pageNumber - 1)
      * state.perPage, state.pageNumber * state.perPage),

    voyagesPaginationLength: (state, getters) => Math
      .ceil(getters.sortedVoyages.length / state.perPage),

    voyagesSortKeys: (state) => state.sortKeys,

    voyagesFilterKeys: (state) => state.filters,
  },
};
