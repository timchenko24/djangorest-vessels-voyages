<template>

  <v-layout row wrap class="my-10">

    <v-col
      v-for="(item, index) in items"
      :key="index"
      :md="division"
    >
      <Card :index="(index+1)">

        <template v-slot:img>

          <slot name="img" :item="item"></slot>

        </template>

        <template v-slot:title>

          <slot name="title" :item="item"></slot>

        </template>

        <template v-slot:content>

          <slot name="content" :item="item"></slot>

        </template>

      </Card>

    </v-col>

  </v-layout>

</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardList',
  components: { Card },
  props: {
    items: {
      type: Array,
      required: true,
    },
    division: {
      type: Number,
    },
  },
};
</script>

<style scoped>

</style>
