<template>

  <v-container fluid>

    <div v-if="loading" class="text-xs-center">
      <v-progress-linear
        indeterminate
        height="8"
        absolute
        top
        color="#FBA846">
      </v-progress-linear>
    </div>

    <h1 class="display-3 text-center pt-10">Суда</h1>
    <hr/>

    <MultiSelect @onAbort="abortSelect" @onChange="updItems" label='Тип судна' :filterBy="types">
    </MultiSelect>

    <CardList :items="filter ? filteredVessels : vessels" :division="4">

      <template v-slot:img="imgScope">

        <v-img class="text-center pa-4" max-height="190" :src="getImgURL(imgScope.item.mmsi)"
          :alt="'imgScope.item.mmsi'">
        </v-img>

      </template>

      <template v-slot:title="titleScope">

          <v-card-title class="font-weight-black indigo lighten-5">
            {{ titleScope.item.name }}
          </v-card-title>

        </template>

        <template v-slot:content="contentScope">

          <Tile :items="contentScope.item">
          </Tile>

        </template>

    </CardList>

  </v-container>

</template>

<script>
import axios from 'axios';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import MultiSelect from '../../components/MultiSelect.vue';

export default {

  name: 'Index',
  components: { MultiSelect, CardList, Tile },

  data() {
    return {
      vessels: [],
      selectedTypes: [],
      types: [],
      loading: true,
      filter: false,
      titles: ['Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип'],
    };
  },

  methods: {

    async getData() {
      const path = 'http://127.0.0.1:8000/api/vessel/';
      const wholeResponse = await axios.get(path);
      this.loading = false;
      this.vessels = wholeResponse.data;

      const temp = new Set();
      this.vessels.forEach((v) => temp.add(v.type));
      this.types = Array.from(temp);
    },

    getImgURL(path) {
      // eslint-disable-next-line import/no-dynamic-require
      return require(`../../assets/vessels/${path}.jpg`);
    },

    getVesselInf() {
      this.wholeResponse.map((e) => {
        e.mmsi = { ...e.mmsi, title: 'closed' };
        return e;
      });
    },

    updItems(val) {
      this.selectedTypes = val;
      this.filter = true;
    },

    abortSelect(val) {
      this.filter = val;
    },

  },

  computed: {

    filteredVessels() {
      return this.vessels.filter((v) => this.selectedTypes.includes(v.type));
    },

  },

  async mounted() {
    await this.getData();
  },
};
</script>

<style scoped>

</style>
