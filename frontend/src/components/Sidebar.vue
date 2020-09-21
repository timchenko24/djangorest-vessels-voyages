<template>

  <v-navigation-drawer
    class="w-100 h-100"
    :class="{'border-right': this.$vuetify.breakpoint.width > 959}"
    permanent
    floating
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

</style>
