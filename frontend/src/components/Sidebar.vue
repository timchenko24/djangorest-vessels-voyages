<template>
  <v-navigation-drawer
    class="w-100 h-100"
    permanent
    :floating="this.$vuetify.breakpoint.width < 960"
  >

    <v-list>

      <v-list-item v-if="titled">

        <v-list-item-content>

          <v-list-item-title class="title">
            {{ title }}
          </v-list-item-title>

        </v-list-item-content>

      </v-list-item>

      <v-list-item>

        <v-list-item-content>
          <slot name="content"></slot>
        </v-list-item-content>

      </v-list-item>

      </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  props: {

    title: {
      type: String,
    },

    titled: {
      type: Boolean,
      default: false,
    },

  },
};
</script>

<style scoped>
.border {
  border-right: 1px solid;
}
</style>
