<template>

  <v-container fluid>

    <v-layout row wrap>

      <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

      <v-flex md3 class="pa-5">

        <v-layout row wrap>

          <Sidebar>

            <template v-slot:content>

              <v-flex md12>
                <MultiSelect @onReset="updateFilterByRoute" @onChange="updateFilterByRoute"
                             label='Маршрут' :filterBy="Object.keys(voyagesFilterKeys.route.dict)">
                </MultiSelect>
              </v-flex>

              <v-flex md12>
                <MultiSelect @onReset="updateFilterByVessel" @onChange="updateFilterByVessel"
                             label='Судно' :filterBy="Object.keys(voyagesFilterKeys.vessel.dict)">
                </MultiSelect>
              </v-flex>

              <v-divider class="my-5"></v-divider>

              <v-flex md12
                v-for="(key, index) in Object.keys(voyagesFilterKeys)"
                :key="index">

                <template v-if="voyagesFilterKeys[key].range">

                  <h5>{{voyagesFilterKeys[key].title}}</h5>

                  <RangeSelect :filter="voyagesFilterKeys[key]"
                               :limitMin="voyagesFilterKeys[key].limits[0]"
                               :limitMax="voyagesFilterKeys[key].limits[1]"></RangeSelect>

                  <v-divider class="my-5"></v-divider>

                </template>

              </v-flex>

              <v-btn @click="getFilteredData(voyagesFilterKeys)" color="primary" dark>
                Фильтровать
              </v-btn>

            </template>

          </Sidebar>

        </v-layout>

      </v-flex>

      <v-flex md9 class="pa-6">

        <v-layout row wrap>

          <v-flex md12 class="pa-4">

            <h1 class="display-3 text-center pt-10">Рейсы</h1>
            <hr/>

            <SortBy :keys="voyagesSortKeys" :label="'Сортировать'" @onChange="updateBySort" />

            <Search @onSearch="updateSearchStr" />

            <v-divider></v-divider>

            <CardList :items="paginatedVoyages" :division="6">

              <template v-slot:title="titleScope">

                <v-card-title class="font-weight-black indigo lighten-5">
                  {{ titleScope.item.route.value }}
                </v-card-title>

              </template>

              <template v-slot:content="contentScope">

                <Tile :items="contentScope.item"></Tile>

              </template>

            </CardList>

            <v-pagination
              @input="updatePageNumber(pageNumber)"
              v-model="pageNumber"
              :length="voyagesPaginationLength"
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import LinearProgress from '../../components/LinearProgress.vue';
import SortBy from '../../components/SortBy.vue';
import Search from '../../components/Search.vue';
import MultiSelect from '../../components/MultiSelect.vue';
import Sidebar from '../../components/Sidebar.vue';
import pagination from '../../components/mixins/pagination';
import paramQueryGenerator from '../../components/mixins/paramQueryGenerator';
import titler from '../../components/mixins/titler';
import RangeSelect from '../../components/RangeSelect.vue';

export default {
  name: 'Index',
  components: {
    RangeSelect,
    Search,
    SortBy,
    CardList,
    Tile,
    LinearProgress,
    MultiSelect,
    Sidebar,
  },
  mixins: [titler, pagination, paramQueryGenerator],

  data() {
    return {
      pageNumber: 1,
      loading: true,
    };
  },

  methods: {
    ...mapActions(['getVoyagesData', 'getVesselsData', 'getRoutesData', 'getFilteredData']),
    ...mapMutations(['updateBySort', 'updateSearchStr', 'updatePageNumber', 'updateFilterByVessel',
      'updateFilterByRoute']),

    calculateAllRangeLimits() {
      Object.entries(this.voyagesFilterKeys).forEach(([key, value]) => {
        if (value.range) {
          this.voyagesFilterKeys[key].limits = RangeSelect.methods
            .calculateRangeLimits(this.allVoyages, key);
        }
      });
    },
  },

  computed: {
    ...mapGetters(['allVoyages', 'titledVoyages', 'paginatedVoyages', 'voyagesSortKeys',
      'voyagesPaginationLength', 'voyagesFilterKeys']),
  },

  async mounted() {
    await this.getVoyagesData();
    await this.getVesselsData();
    await this.getRoutesData();
    this.loading = false;
    this.calculateAllRangeLimits();
  },
};
</script>

<style scoped>

</style>
