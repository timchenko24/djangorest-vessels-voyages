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
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4core from '@amcharts/amcharts4/core';
import am4geodataWorldHigh from '@amcharts/amcharts4-geodata/worldHigh';

export default {
  name: 'Index',

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

    makeMap() {
      this.map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
      this.map.geodata = am4geodataWorldHigh;
      this.map.projection = new am4maps.projections.Miller();
      const polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      polygonSeries.exclude = ['AQ'];
      this.map.series.push(polygonSeries);
      this.map.zoomControl = new am4maps.ZoomControl();

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#B0BEC5');

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#78909C');

      const imageSeries = this.map.series.push(new am4maps.MapImageSeries());

      const imageSeriesTemplate = imageSeries.mapImages.template;
      const circle = imageSeriesTemplate.createChild(am4core.Circle);
      circle.radius = 6;
      circle.fill = am4core.color('#B27799');
      circle.stroke = am4core.color('#FFFFFF');
      circle.strokeWidth = 2;
      circle.nonScaling = true;
      circle.tooltipText = '{title}\nШирота: {latitude}\nДолгота: {longitude}';

      imageSeriesTemplate.propertyFields.latitude = 'latitude';
      imageSeriesTemplate.propertyFields.longitude = 'longitude';

      this.ports.forEach((item) => {
        imageSeries.data.push({
          'latitude': parseFloat(item.latitude),
          'longitude': parseFloat(item.longitude),
          'title': item.name,
        });
      });
    },
  },

  async mounted() {
    await this.getData();
    this.makeMap();
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
