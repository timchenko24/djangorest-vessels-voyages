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
  },
  state: {
    vessels: [],
    titles: ['MMSI', 'Тип', 'Флаг', 'Год постройки', 'Название', 'IMO', 'Позывной', 'Длина',
      'Ширина', 'Грузоподъемность', 'Дедвейт'],
    // titledVessels: [],
    pageNumber: 1,
    perPage: 6,
    isSearching: false,
    searchedVessels: [],
  },
  getters: {
    allVessels: (state) => state.vessels,
    titledVessels: (state) => titler.methods.setTitles(state.vessels, state.titles, []),
    paginatedVessels: (state, getters) => {
      if (state.isSearching) {
        return state.searchedVessels.slice((state.pageNumber - 1) * state.perPage,
          state.pageNumber * state.perPage);
      }
      return getters.titledVessels.slice((state.pageNumber - 1) * state.perPage,
        state.pageNumber * state.perPage);
    },
    paginationLength: (state, getters) => Math.ceil(getters.titledVessels.length / state.perPage),
  },
};
