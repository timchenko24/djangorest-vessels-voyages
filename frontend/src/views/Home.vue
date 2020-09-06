<template>
 <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-flex>
          <v-card
            class="mx-auto my-10"
            max-width="1000"
            elevation="15"
          >
            <v-img
              class="white--text align-end"
              height="400"
              src="../assets/main.jpg"
            >
              <v-card-title>Информационно-аналитическая система<br>интеллектуального
                анализа данных<br>о Рейсах судов</v-card-title>
              <v-card-actions>
                <v-btn
                  color="#FBA846"
                  text
                >
                  Подробнее
                </v-btn>
              </v-card-actions>
            </v-img>
          </v-card>
        </v-flex>
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <CardList :items="items" :division="3">

      <template v-slot:img="imgScope">

        <v-img class="text-center pa-4">
          <v-icon size="50" color="#FBA846">{{ imgScope.item.icon }}</v-icon>
        </v-img>

      </template>


      <template v-slot:title="titleScope">

        <router-link :to="titleScope.item.path" class="black--text">

          <v-card-title>
            {{ titleScope.item.title }}
          </v-card-title>

        </router-link>

      </template>

      <template v-slot:content="contentScope">

        <v-card-text>
          {{ contentScope.item.text }}
        </v-card-text>

      </template>

    </CardList>

  </v-container>

</template>

<script>
import CardList from '../components/CardList.vue';

export default {

  name: 'Home',
  components: { CardList },
  data() {
    return {
      items: [
        {
          title: 'Суда',
          icon: 'mdi-ferry',
          text: 'Основная информация о судах: номер MMSI, IMO, название, национальность, '
              + 'год постройки, позывной, длина, ширина, грузоподъемность, дедвейт',
          path: '/vessels',
        },
        {
          title: 'Порты',
          icon: 'mdi-anchor',
          text: 'Основная информация о портах: страна, название, тип, широта, долгота',
          path: '/ports',
        },
        {
          title: 'Маршруты',
          icon: 'mdi-compass',
          text: 'Список маршрутов судов в формате Порт отправления - Порт назначения',
          path: '/routes',
        },
        {
          title: 'Рейсы',
          icon: 'mdi-buddhism',
          text: 'Основная информация о каждом рейсе судна: дата отбытия, дата прибытия в порт,'
              + 'время в порту, затраты на топливо, завтраты на экипаж, портовые расходы и т.д.',
          path: '/voyages',
        },
      ],
    };
  },
};

</script>
