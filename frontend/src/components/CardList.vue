<template>
  <v-row class="my-10">

    <v-col
      v-for="(item, index) in items"
      :key="index"
      cols="12"
      :sm="division"
    >
      <Card :index="(index+1)">

        <template v-slot:img>

          <slot name="img" :path="item"></slot>

        </template>

        <template v-slot:title>

          <slot name="title" :path="item"></slot>

        </template>

        <template v-slot:content>

          <slot name="content" :path="item"></slot>

        </template>

      </Card>

    </v-col>

  </v-row>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardList',
  components: { Card },
  props: {
    items: {
      type: Object,
      required: true,
    },
    division: {
      type: Number,
    },
  },
  data: () => ({
  }),
};
</script>

<style scoped>

</style>
