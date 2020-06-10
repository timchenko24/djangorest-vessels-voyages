<template>

  <v-container fluid class="pa-0">

    <v-layout wrap>

      <template v-for="(item, index) in items">

        <v-flex :key="index" class="w-50">

          <v-card
            class="pa-2 h-100 border-right-0 border-bottom-0"
            outlined
            tile
          >
            <slot name="title" :item="item">
              <v-card-title class="pa-0 justify-content-center text-center
                                   subtitle-1 font-weight-medium">
                {{ item.title.value }}
              </v-card-title>
            </slot>

            <slot name="content" :item="item">
              <v-card-text class="pa-0 text-center body-1">
                {{ item.value }}
              </v-card-text>
            </slot>

          </v-card>

        </v-flex>

      </template>

    </v-layout>

  </v-container>

</template>

<script>
export default {
  name: 'Tile',
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>
