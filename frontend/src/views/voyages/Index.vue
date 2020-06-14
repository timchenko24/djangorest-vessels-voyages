<template>
  <v-container fluid>

    <LinearProgress :height="6" color="#FBA846" :loading="loading"></LinearProgress>

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

  </v-container>
</template>

<script>
import axios from 'axios';
import CardList from '../../components/CardList.vue';
import Tile from '../../components/Tile.vue';
import LinearProgress from '../../components/LinearProgress.vue';

import titler from '../../components/mixins/titler';

export default {
  name: 'Index',
  components: { CardList, Tile, LinearProgress },
  mixins: [titler],

  data() {
    return {
      voyages: [],
      titledVoyages: [],
      titles: ['Маршрут', 'Судно', 'Дата отбытия', 'Дата прибытия', 'Время в порту (час)', 'Затраты на топливо ($)',
        'Затраты на экипаж ($)', 'Портовые расходы ($)', 'Расходы на страхование ($)', 'Сумма расходов ($)',
        'Доход от перевозки груза ($)', 'Чистый суммарный фрахт ($)', 'Прибыль за рейс ($)'],
      loading: true,
    };
  },

  methods: {
    async getData() {
      const path = 'http://127.0.0.1:8000/api/voyage/';
      const wholeResponse = await axios.get(path);
      this.loading = false;
      this.voyages = wholeResponse.data;
    },
  },

  async mounted() {
    await this.getData();
    this.titledVoyages = this.setTitles(this.voyages, this.titles, ['id']);
  },
};
</script>

<style scoped>

</style>
