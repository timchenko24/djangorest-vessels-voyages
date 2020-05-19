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

    <CardList :items="wholeResponse" :division="4">

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

export default {

  name: 'Index',
  components: { CardList, Tile },
  data() {
    return {
      wholeResponse: [],
      loading: true,
      titles: ['Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип', 'Тип'],
    };
  },
  methods: {
    getData() {
      const path = 'http://127.0.0.1:8000/api/vessel/';
      axios.get(path).then((res) => {
        this.wholeResponse = res.data;
        this.loading = false;
      })
        .catch((error) => {
          console.error(error);
        });
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
  },
  async created() {
    this.getData();
  },
};
</script>

<style scoped>

</style>
