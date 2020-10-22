<template>
  <v-app-bar
    app
    color="#587796"
    dark
  >
    <v-toolbar-title>
      <v-icon>
        mdi-anchor
      </v-icon>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!isAuthenticated">

      <router-link to="/login">
        <v-btn text>
          Вход
          <v-icon right>mdi-login</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/register">
        <v-btn text>
          Регистрация
          <v-icon right>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>

    </template>

    <template v-else>

      <router-link to="/dashboard">
        <v-btn text>
          Профиль
          <v-icon right>mdi-account</v-icon>
        </v-btn>
      </router-link>

      <router-link to="/logout">
        <v-btn text>
          Выход
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </router-link>

    </template>

  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

<style scoped>

</style>
