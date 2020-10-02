<template>

  <v-container fluid>

    <v-layout row wrap>

      <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

      <v-flex md3 class="pa-5">

        <v-layout row wrap>

          <Sidebar>

            <template v-slot:content>
              <v-flex md12>
                <MultiSelect @onReset="updateFilterByType" @onChange="updateFilterByType"
                             label='Тип судна' :filterBy="Object.keys(filterKeys.type.dict)">
                </MultiSelect>
              </v-flex>

              <v-flex md12>
                <MultiSelect @onReset="updateFilterByFlag" @onChange="updateFilterByFlag"
                             label='Флаг' :filterBy="Object.keys(filterKeys.flag.dict)">
                </MultiSelect>
              </v-flex>

              <v-divider class="my-5"></v-divider>

              <v-flex md12
                v-for="(key, index) in Object.keys(filterKeys)"
                :key="index">

                <template v-if="filterKeys[key].range">

                  <h5>{{filterKeys[key].title}}</h5>

                  <RangeSelect :filter="filterKeys[key]"
                               :placeholderLeft="filterKeys[key].limits[0]"
                               :placeholderRight="filterKeys[key].limits[1]"></RangeSelect>

                  <v-divider class="my-5"></v-divider>

                </template>

              </v-flex>

                <v-btn @click="getFilteredData(filterKeys)" color="primary" dark>Фильтровать</v-btn>

            </template>

          </Sidebar>

        </v-layout>

      </v-flex>

      <v-flex md9 class="pa-6">

        <v-layout row wrap>

          <v-flex md12 class="pa-4">

            <h1 class="display-3 text-center pt-10">Суда</h1>
            <hr/>

            <SortBy :keys="vesselsSortKeys" :label="'Сортировать'" @onChange="updateBySort" />

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
              :length="vesselsPaginationLength"
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
      loading: true,
      pageNumber: 1,
    };
  },

  methods: {
    ...mapActions(['getVesselsData', 'getVesselsFlag', 'getVesselsType', 'getFilteredData']),
    ...mapMutations(['updatePageNumber', 'updateSearchStr', 'updateBySort', 'updateFilterByType',
      'updateFilterByFlag']),

    calculateAllRangeLimits() {
      Object.entries(this.filterKeys).forEach(([key, value]) => {
        if (value.range) {
          this.filterKeys[key].limits = RangeSelect.methods.calculateRangeLimits(this.allVessels,
            key);
        }
      });
    },

    getImgURL(path) {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../../assets/vessels/${path}.jpg`);
    },
  },

  computed: {
    ...mapGetters(['allVessels', 'titledVessels', 'paginatedVessels', 'vesselsPaginationLength',
      'vesselsSortKeys', 'filterKeys']),
  },

  async mounted() {
    await this.getVesselsData();
    await this.getVesselsFlag();
    await this.getVesselsType();
    this.loading = false;
    this.calculateAllRangeLimits();
  },
};
</script>

<style scoped>

</style>
