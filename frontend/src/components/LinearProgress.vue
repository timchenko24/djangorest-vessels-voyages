<template>

  <div v-if="loading" class="text-center">

    <v-progress-linear
      indeterminate
      :height='height'
      absolute
      top
      :color='color'>
    </v-progress-linear>

  </div>

</template>

<script>
export default {
  name: 'LinearProgress',

  props: {

    height: {
      type: [Number, String],
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    loading: {
      type: Boolean,
      required: true,
    },

  },
};
</script>

<style scoped>

</style>
