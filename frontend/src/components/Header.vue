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

    <v-btn text>
      Вход
      <v-icon right>mdi-login</v-icon>
    </v-btn>

    <router-link to="/register">
      <v-btn text>
        Регистрация
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </router-link>

  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>

</style>
