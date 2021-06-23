import axios from 'axios';
import { getKeyByValue } from '../../utils';

export default {
  state: {
    sections: {
      dataset: {
        selected: undefined,
        options: {},
        enabled: false,
      },
      action: {
        selected: undefined,
        options: {
          'Отобразить распределения': 'distrib',
          'Выбрать алгоритм кластеризации': 'alg',
        },
        enabled: false,
      },
      feature: {
        selected: undefined,
        options: {},
        enabled: false,
      },
      transformFunc: {
        selected: undefined,
        options: {},
        enabled: false,
      },
      alg: {
        selected: undefined,
        options: {},
        enabled: false,
      },
    },
    k: 2,
    linkages: [],
    selectedLinkage: '',
    clusteredData: [],
  },

  mutations: {
    updateDataSets(state, datasets) {
      state.sections.dataset.options = datasets;
    },
    updateSelectedDataset(state, option) {
      const selection = state.sections.dataset.options[option];
      state.sections.dataset.selected = selection;
      state.sections.feature.options = getKeyByValue(state.sections.dataset.options, selection)
        .split('-').map((item) => item.trim());
    },

    updateSelectedAction(state, option) {
      state.sections.action.selected = state.sections.action.options[option];
      state.sections.transformFunc.enabled = true;
      state.sections.alg.enabled = option === 'Выбрать алгоритм кластеризации';
      state.sections.feature.enabled = option === 'Отобразить распределения';
    },

    updateTransformFuncs(state, funcs) {
      state.sections.transformFunc.options = funcs;
    },
    updateSelectedTransformFunc(state, option) {
      state.sections.transformFunc.selected = state.sections.transformFunc.options[option];
    },

    updateAlgs(state, algs) {
      state.sections.alg.options = algs;
    },
    updateSelectedAlg(state, option) {
      state.sections.alg.selected = state.sections.alg.options[option];
    },

    updateSelectedK(state, k) {
      state.k = k;
    },
    updateLinkages(state, linkages) {
      state.linkages = linkages;
    },
    updateSelectedLinkage(state, linkage) {
      state.selectedLinkage = state.linkages[linkage];
    },

    updateClusteredData(state, data) {
      state.clusteredData = data;
    },

    updateSelectedFeature(state, feature) {
      state.sections.feature.selected = feature;
    },
  },

  actions: {
    async getData(ctx) {
      const wholeResponse = await axios.get('http://127.0.0.1:8000/ml/clustering/');
      ctx.commit('updateDataSets', wholeResponse.data.datasets);
      ctx.commit('updateTransformFuncs', wholeResponse.data.funcs);
      ctx.commit('updateAlgs', wholeResponse.data.algs);
      ctx.commit('updateLinkages', wholeResponse.data.linkages);
    },
    async getClusteredData(ctx) {
      let path = `http://127.0.0.1:8000/ml/clustering/
          ${ctx.state.sections.alg.selected || 'kmeans'}/
          ?query=${ctx.state.sections.dataset.selected}
          &${ctx.state.sections.transformFunc.selected}`.replace(/\s+/g, '');

      let specificParam = '';

      if (ctx.state.sections.alg.selected === 'kmeans') {
        specificParam = `&k=${ctx.state.k}`;
      } else {
        specificParam = `&linkage=${ctx.state.selectedLinkage}`;
      }

      path += specificParam;

      const wholeResponse = await axios.get(path);
      ctx.commit('updateClusteredData', wholeResponse.data);
    },
  },

  getters: {
    datasetSection: (state) => state.sections.dataset,
    transformFuncSection: (state) => state.sections.transformFunc,
    algSection: (state) => state.sections.alg,
    actionSection: (state) => state.sections.action,
    featureSection: (state) => state.sections.feature,
    linkages: (state) => state.linkages,
    clusteredData: (state) => state.clusteredData,
  },
};
