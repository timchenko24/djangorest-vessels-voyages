<template>

  <v-container fluid>

    <v-layout row wrap>

      <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

      <v-flex md3 class="pa-5">

        <v-layout row wrap>

          <Sidebar>

            <template v-slot:content>
              <v-flex md12>
                <MultiSelect @onAbort="abortSelectByType" @onChange="updateByType" label='Тип судна'
                             :filterBy="Object.keys(filters.type.dict)">
                </MultiSelect>
              </v-flex>

              <v-flex md12>
                <MultiSelect @onAbort="abortSelectByFlag" @onChange="updateByFlag" label='Флаг'
                             :filterBy="Object.keys(filters.flag.dict)">
                </MultiSelect>
              </v-flex>

              <v-divider class="my-5"></v-divider>

              <v-flex md12
                v-for="(key, index) in Object.keys(filters)"
                :key="index">

                <template v-if="filters[key].range">

                  <h5>{{filters[key].title}}</h5>

                  <RangeSelect :filter="filters[key]"
                               :placeholderLeft="filters[key].limits[0]"
                               :placeholderRight="filters[key].limits[1]"></RangeSelect>

                  <v-divider class="my-5"></v-divider>

                </template>

              </v-flex>

                <v-btn @click="getFilteredData()" color="primary" dark>Фильтровать</v-btn>

            </template>

          </Sidebar>

        </v-layout>

      </v-flex>

      <v-flex md9 class="pa-6">

        <v-layout row wrap>

          <v-flex md12 class="pa-4">

            <h1 class="display-3 text-center pt-10">Суда</h1>
            <hr/>

            <SortBy :keys="sortKeys" :label="'Сортировать'" @onChange="updateBySort"></SortBy>

            <Search @onSearch="updateSearchStr" />

            <v-divider></v-divider>

            <CardList :items="paginatedVessels" :division="4">

              <template v-slot:img="imgScope">

                <v-img class="text-center pa-4" height="190"
                       :src="getImgURL(imgScope.item.mmsi.value)"
                  :alt="'imgScope.item.mmsi.value'">
                </v-img>

              </template>

              <template v-slot:title="titleScope">

                  <v-card-title class="font-weight-black indigo lighten-5">

                    {{ titleScope.item.name.value }}

                  </v-card-title>

                </template>

                <template v-slot:content="contentScope">

                  <Tile :items="contentScope.item">
                  </Tile>

                </template>

            </CardList>

            <v-pagination
              @input="updatePageNumber(pageNumber)"
              v-model="pageNumber"
              :length="paginationLength"
              circle
              class="mb-10"
            ></v-pagination>

          </v-flex>

        </v-layout>

      </v-flex>

    </v-layout>
  </v-container>

</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import MultiSelect from '../../components/MultiSelect.vue';
import LinearProgress from '../../components/LinearProgress.vue';
import titler from '../../components/mixins/titler';
import paramQueryGenerator from '../../components/mixins/paramQueryGenerator';
import RangeSelect from '../../components/RangeSelect.vue';
import Sidebar from '../../components/Sidebar.vue';
import SortBy from '../../components/SortBy.vue';
import Search from '../../components/Search.vue';

export default {

  name: 'Index',
  components: {
    MultiSelect, CardList, Tile, LinearProgress, RangeSelect, Sidebar, SortBy, Search,
  },
  mixins: [titler, paramQueryGenerator],

  data() {
    return {
      vessels: [],
      titles: ['MMSI', 'Тип', 'Флаг', 'Год постройки', 'Название', 'IMO', 'Позывной',
        'Длина', 'Ширина', 'Грузоподъемность', 'Дедвейт'],
      types: {},
      flags: {},
      valid: false,
      loading: true,

      pageNumber: 1,
      test: '',
      sorting: {
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

      isSearching: false,
    };
  },

  methods: {
    ...mapActions(['getVesselsData']),
    ...mapMutations(['updatePageNumber', 'updateSearchStr', 'updateBySort']),
    async getData() {
      let wholeResponse = await axios.get('http://127.0.0.1:8000/api/vessel/');
      this.vessels = wholeResponse.data;

      wholeResponse = await axios.get('http://localhost:8000/api/vessel-type/');
      this.types = wholeResponse.data;
      this.filters.type.dict = Object.assign({}, ...this.types.map((x) => ({ [x.type]: x.id })));

      wholeResponse = await axios.get('http://localhost:8000/api/vessel-flag/');
      this.flags = wholeResponse.data;
      this.filters.flag.dict = Object.assign({}, ...this.flags.map((x) => ({ [x.flag]: x.id })));

      // this.titledVessels = this.setTitles(this.vessels, this.titles, []);
      this.searchedVessels = [...this.titledVessels];

      this.loading = false;
    },

    async getFilteredData() {
      const path = this.createParamQuery('http://localhost:8000/api/vessel/?');
      const response = await axios.get(path);
      const result = response.data;

      this.pageNumber = 1;
      this.isSearching = false;
      this.titledVessels = this.setTitles(result, this.titles, []);
    },

    calculateAllRangeLimits() {
      Object.entries(this.filters).forEach(([key, value]) => {
        if (value.range) {
          this.filters[key].limits = RangeSelect.methods.calculateRangeLimits(this.vessels, key);
        }
      });
    },

    getImgURL(path) {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../../assets/vessels/${path}.jpg`);
    },

    updateByType(val) {
      this.filters.type.dataSet = val;
      this.filters.type.enabled = true;
      this.pageNumber = 1;
    },

    updateByFlag(val) {
      this.filters.flag.dataSet = val;
      this.filters.flag.enabled = true;
      this.pageNumber = 1;
    },

    abortSelectByType(val) {
      this.filters.type.dataSet = val;
      this.filters.type.enabled = false;
      this.pageNumber = 1;
    },

    abortSelectByFlag(val) {
      this.filters.flag.dataSet = val;
      this.filters.flag.enabled = false;
      this.pageNumber = 1;
    },
  },

  computed: {
    ...mapGetters(['allVessels', 'titledVessels', 'paginatedVessels', 'paginationLength',
      'sortKeys']),
  },

  async mounted() {
    await this.getVesselsData();
    await this.getData();
    this.calculateAllRangeLimits();
  },
};
</script>

<style scoped>

</style>
