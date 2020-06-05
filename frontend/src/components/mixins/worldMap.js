import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4core from '@amcharts/amcharts4/core';
import am4geodataWorldHigh from '@amcharts/amcharts4-geodata/worldHigh';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

export default {
  data() {
    return {
      map: Object,
    };
  },

  methods: {
    makeMap() {
      this.map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
      am4core.useTheme(am4themesAnimated);

      this.map.geodata = am4geodataWorldHigh;
      this.map.projection = new am4maps.projections.Miller();
      this.map.zoomControl = new am4maps.ZoomControl();

      const polygonSeries = new am4maps.MapPolygonSeries();
      polygonSeries.useGeodata = true;
      polygonSeries.exclude = ['AQ'];
      this.map.series.push(polygonSeries);

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#B0BEC5');

      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#78909C');
    },

    setImageSeries(ports) {
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

      ports.forEach((item) => {
        imageSeries.data.push({
          'latitude': parseFloat(item.latitude),
          'longitude': parseFloat(item.longitude),
          'title': item.name,
        });
      });
    },

    setLineSeries(routes) {
      const interfaceColors = new am4core.InterfaceColorSet();

      const lineSeries = this.map.series.push(new am4maps.MapLineSeries());
      lineSeries.dataFields.multiGeoLine = 'multiGeoLine';

      const lineTemplate = lineSeries.mapLines.template;
      lineTemplate.nonScalingStroke = true;
      lineTemplate.arrow.nonScaling = true;
      lineTemplate.arrow.width = 4;
      lineTemplate.arrow.height = 6;
      lineTemplate.stroke = interfaceColors.getFor('alternativeBackground');
      lineTemplate.fill = interfaceColors.getFor('alternativeBackground');
      lineTemplate.line.strokeOpacity = 0.4;

      routes.forEach((route) => {
        lineSeries.data.push({
          'multiGeoLine': [
            [
              { 'latitude': route.departure_port.latitude, 'longitude': route.departure_port.longitude },
              { 'latitude': route.destination_port.latitude, 'longitude': route.destination_port.longitude },
            ],
          ],
        });
      });
    },
  },
};
