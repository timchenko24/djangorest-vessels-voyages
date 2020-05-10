<template>
  <v-app>
    <v-app-bar
      app
      color="indigo darken-1"
      dark
    >
      <v-toolbar-title>Рейсы</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text>
        Вход
        <v-icon right>mdi-login</v-icon>
      </v-btn>

      <v-btn text>
        Регистрация
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
