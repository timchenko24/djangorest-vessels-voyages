<template>
  <v-hover
    v-slot:default="{ hover }"
    close-delay="10"
  >

    <v-card
      class="mx-auto justify-center"
      :elevation="hover ? 12 : 4"
    >

      <slot name="img"></slot>

      <slot name="title">
        <v-card-title>
          {{ title }}
        </v-card-title>
      </slot>

      <slot name="content">
        <v-card-text>
          {{ text }}
        </v-card-text>
      </slot>

    </v-card>

  </v-hover>
</template>

<script>
export default {
  name: 'Card',

  props: {
    index: {
      type: [Number, String],
    },
  },

  data: () => ({
    text: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore\n'
              + 'te sed. Elitr scripta ocurreret qui ad.',
    title: 'Test',
  }),
};
</script>

<style scoped>

</style>
