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
      state.isSearching = true;
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
    isSearching: false,
  },
  getters: {
    allVessels: (state) => state.vessels,

    titledVessels: (state) => titler.methods.setTitles(state.vessels, state.titles, []),

    searchedVessels: (state, getters) => getters.titledVessels.filter((item) => item.name.value
      .toLowerCase().indexOf(state.searchStr.toLowerCase()) !== -1),

    paginatedVessels: (state, getters) => {
      const searchBy = state.isSearching ? 'searchedVessels' : 'titledVessels';
      return getters[searchBy].slice((state.pageNumber - 1) * state.perPage,
        state.pageNumber * state.perPage);
    },

    paginationLength: (state, getters) => {
      const searchBy = state.isSearching ? 'searchedVessels' : 'titledVessels';
      return Math.ceil(getters[searchBy].length / state.perPage);
    },
  },
};
