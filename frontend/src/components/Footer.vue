<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="white--text text-center w-100"
      color="#587796"
    >
      <v-card-text>
        <v-btn
          v-for="icon in allIcons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus
        commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at
        orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <i>Chenskiy Timofey</i>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',

  computed: {
    ...mapGetters(['allIcons']),
  },
};
</script>

<style scoped>

</style>
