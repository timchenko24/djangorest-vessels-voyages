<template>

  <v-container fluid>

    <v-layout row wrap>

      <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

      <v-flex md3 class="pa-5">

        <v-layout row wrap>

          <Sidebar>

            <template v-slot:content>

              <v-flex md12>
                <MultiSelect @onAbort="abortSelectByType" @onChange="updateByType" label='Тип судна'
                             :filterBy="Object.keys(filters.route.dict)">
                </MultiSelect>
              </v-flex>

              <v-flex md12>
                <MultiSelect @onAbort="abortSelectByFlag" @onChange="updateByFlag" label='Флаг'
                             :filterBy="Object.keys(filters.vessel.dict)">
                </MultiSelect>
              </v-flex>


            </template>

          </Sidebar>

        </v-layout>

      </v-flex>

      <v-flex md9 class="pa-6">

        <v-layout row wrap>

          <v-flex md12 class="pa-4">

            <h1 class="display-3 text-center pt-10">Рейсы</h1>
            <hr/>

            <CardList :items="titledVoyages" :division="6">

                <template v-slot:title="titleScope">

                  <v-card-title class="font-weight-black indigo lighten-5">
                    {{ titleScope.item.route.value }}
                  </v-card-title>

                </template>

                <template v-slot:content="contentScope">

                  <Tile :items="contentScope.item"></Tile>

                </template>

              </CardList>

          </v-flex>

        </v-layout>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>
import axios from 'axios';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import LinearProgress from '../../components/LinearProgress.vue';
import titler from '../../components/mixins/titler';
import MultiSelect from '../../components/MultiSelect.vue';
// import RangeSelect from '../../components/RangeSelect.vue';
import Sidebar from '../../components/Sidebar.vue';
// import SortBy from '../../components/SortBy.vue';
// import Search from '../../components/Search.vue';
import pagination from '../../components/mixins/pagination';
import paramQueryGenerator from '../../components/mixins/paramQueryGenerator';

export default {
  name: 'Index',
  components: {
    CardList, Tile, LinearProgress, MultiSelect, Sidebar, // SortBy, Search, RangeSelect
  },
  mixins: [titler, pagination, paramQueryGenerator],

  data() {
    return {
      voyages: [],
      titledVoyages: [],
      titles: ['Маршрут', 'Судно', 'Дата отбытия', 'Дата прибытия', 'Время в порту (час)', 'Затраты на топливо ($)',
        'Затраты на экипаж ($)', 'Портовые расходы ($)', 'Расходы на страхование ($)', 'Сумма расходов ($)',
        'Доход от перевозки груза ($)', 'Чистый суммарный фрахт ($)', 'Прибыль за рейс ($)'],
      routes: {},
      dates: {},
      vessels: {},
      loading: true,

      filters: {
        route: {
          dataSet: [],
          dict: {},
          range: false,
          string: 'route__in=',
          title: 'Маршрут',
          enabled: false,
        },
        vessel: {
          dataSet: [],
          dict: {},
          range: false,
          string: 'mmsi__in=',
          title: 'Судно',
          enabled: false,
        },
        departure_date: {
          dataSet: [],
          dict: {},
          range: false,
          string: 'departure_date__in=',
          title: 'Дата отправления',
          enabled: false,
        },
        arrival_date: {
          dataSet: [],
          dict: {},
          range: false,
          string: 'arrival_date__in=',
          title: 'Дата отправления',
          enabled: false,
        },
        port_time: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['time_in_port__gte=', 'time_in_port__lte='],
          title: 'Время в порту',
          enabled: [false, false],
        },
        fuel_costs: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['fuel_costs__gte=', 'fuel_costs__lte='],
          title: 'Затраты на топливо',
          enabled: [false, false],
        },
        crew_costs: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['crew_costs__gte=', 'crew_costs__lte='],
          title: 'Затраты на экипаж',
          enabled: [false, false],
        },
        port_charges: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['port_charges__gte=', 'port_charges__lte='],
          title: 'Портовые расходы',
          enabled: [false, false],
        },
        insurance_costs: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['insurance_costs__gte=', 'insurance_costs__lte='],
          title: 'Затраты на страховку',
          enabled: [false, false],
        },
        total_costs: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['total_costs__gte=', 'total_costs__lte='],
          title: 'Сумма затрат',
          enabled: [false, false],
        },
        cargo_income: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['cargo_income__gte=', 'cargo_income__lte='],
          title: 'Доход от перевозки груза',
          enabled: [false, false],
        },
        net_total_freight: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['net_total_freight__gte=', 'net_total_freight__lte='],
          title: 'Чистый суммарный фрахт',
          enabled: [false, false],
        },
        voyage_profit: {
          dataSet: [],
          dict: {},
          range: true,
          limits: [],
          string: ['voyage_profit__gte=', 'voyage_profit__lte='],
          title: 'Прибыль за рейс',
          enabled: [false, false],
        },
      },
    };
  },

  methods: {
    async getData() {
      const path = 'http://localhost:8000/api';
      let wholeResponse = await axios.get(`${path}/voyage/`);
      this.voyages = wholeResponse.data;

      wholeResponse = await axios.get(`${path}/route/`);
      this.routes = wholeResponse.data;
      this.filters.route.dict = Object.assign({}, ...this.routes
        .map((x) => ({ [x.departure_port]: x.id })));

      wholeResponse = await axios.get(`${path}/date/`);
      this.date = wholeResponse.data;
      this.filters.date.dict = Object.assign({}, ...this.date
        .map((x) => ({ [x.minute]: x.id })));

      wholeResponse = await axios.get(`${path}/vessel/`);
      this.vessels = wholeResponse.data;
      this.filters.vessel.dict = Object.assign({}, ...this.vessels
        .map((x) => ({ [x.name]: x.mmsi })));

      this.titledVoyages = this.setTitles(this.voyages, this.titles, ['id']);

      this.loading = false;
    },
  },

  async mounted() {
    await this.getData();
  },
};
</script>

<style scoped>

</style>
