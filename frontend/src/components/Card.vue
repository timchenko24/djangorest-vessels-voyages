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

      <v-card-title>
        {{ title }}
      </v-card-title>

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
    title: {
      type: String,
    },
    index: {
      type: [Number, String],
    },
  },

  data: () => ({
    text: 'Lorem ipsum dolor sit amet, id quo eruditi eloquentiam. Assum decore\n'
              + 'te sed. Elitr scripta ocurreret qui ad.',
  }),
};
</script>

<style scoped>

</style>
