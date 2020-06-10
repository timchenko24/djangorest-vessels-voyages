<template>

  <v-container fluid>

    <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

    <h1 class="display-3 text-center pt-10">Суда</h1>
    <hr/>

    <MultiSelect @onAbort="abortSelect" @onChange="updItems" label='Тип судна' :filterBy="types">
    </MultiSelect>

    <CardList :items="filter ? filteredVessels : titledVessels" :division="4">

      <template v-slot:img="imgScope">

        <v-img class="text-center pa-4" max-height="190" :src="getImgURL(imgScope.item.mmsi.value)"
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

  </v-container>

</template>

<script>
import axios from 'axios';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import MultiSelect from '../../components/MultiSelect.vue';
import LinearProgress from '../../components/LinearProgress.vue';
import titler from '../../components/mixins/titler';

export default {

  name: 'Index',
  components: {
    MultiSelect, CardList, Tile, LinearProgress,
  },
  mixins: [titler],

  data() {
    return {
      vessels: [],
      selectedTypes: [],
      types: [],
      loading: true,
      filter: false,
      titledVessels: [],
      titles: ['MMSI', 'Тип', 'Флаг', 'Год постройки', 'Название', 'IMO', 'Позывной',
        'Длина', 'Ширина', 'Грузоподъемность', 'Дедвейт'],
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
      return this.titledVessels.filter((v) => this.selectedTypes.includes(v.type.value));
    },

  },

  async mounted() {
    await this.getData();
    this.titledVessels = this.setTitles(this.vessels, this.titles, []);
  },
};
</script>

<style scoped>

</style>
