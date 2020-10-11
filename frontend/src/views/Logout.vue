<template>

  <v-container fill-height>

    <v-row justify="center" align="center">

      <v-col cols="12">
        <h3 class="text-center">Осуществляется выход...</h3>
      </v-col>

    </v-row>

  </v-container>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'Logout',

  methods: {
    ...mapMutations(['removeToken', 'updateAuthStatus']),
  },

  mounted() {
    this.removeToken();
    setTimeout(() => this.$router.push('/'), 1500);
    this.updateAuthStatus();
  },
};
</script>

<style scoped>

</style>
