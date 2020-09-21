<template>

  <v-container fluid fill-height ref="chartdiv" class="py-5">

    <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

  </v-container>

</template>

<script>
import axios from 'axios';
import LinearProgress from '../../components/LinearProgress.vue';
import worldMap from '../../components/mixins/worldMap';

export default {
  name: 'Index',
  components: { LinearProgress },
  mixins: [worldMap],

  data() {
    return {
      map: Object,
      ports: [],
      loading: true,
    };
  },

  methods: {
    async getData() {
      const path = 'http://127.0.0.1:8000/api/port/';
      const wholeResponse = await axios.get(path);
      this.loading = false;
      this.ports = wholeResponse.data;
    },
  },

  async mounted() {
    await this.getData();
    this.makeMap();
    this.setImageSeries(this.ports);
  },

  beforeDestroy() {
    if (this.map) {
      this.map.dispose();
    }
  },
};
</script>

<style scoped>

</style>
