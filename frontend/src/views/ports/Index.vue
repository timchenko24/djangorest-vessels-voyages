<template>
  <v-container fluid fill-height ref="chartdiv" class="py-5">
    <div v-if="loading" class="text-xs-center">
      <v-progress-linear
        indeterminate
        height="8"
        absolute
        top
        color="#FBA846">
      </v-progress-linear>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import worldMap from '../../components/mixins/worldMap';

export default {
  name: 'Index',

  data() {
    return {
      map: Object,
      ports: [],
      loading: true,
    };
  },

  mixins: [worldMap],

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
