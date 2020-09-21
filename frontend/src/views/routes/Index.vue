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
      routes: [],
      ports: [],
      loading: true,
    };
  },

  methods: {
    async getData() {
      const routesPath = 'http://127.0.0.1:8000/api/route/';
      const portsPath = 'http://127.0.0.1:8000/api/port/';
      const routesResponse = await axios.get(routesPath);
      const portsResponse = await axios.get(portsPath);

      this.loading = false;
      const routes = routesResponse.data;
      this.ports = portsResponse.data;

      routes.forEach((route) => {
        const depP = this.ports.find((x) => x.name === route.departure_port);
        const destP = this.ports.find((x) => x.name === route.destination_port);
        this.routes.push({
          departure_port: {
            longitude: depP.longitude,
            latitude: depP.latitude,
          },
          destination_port: {
            longitude: destP.longitude,
            latitude: destP.latitude,
          },
        });
      });
    },
  },

  async mounted() {
    await this.getData();
    this.makeMap();
    this.setImageSeries(this.ports);
    this.setLineSeries(this.routes);
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
