<template>
  <v-app>
    <v-app-bar
      app
      color="#587796"
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

    <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        class="white--text text-center"
        color="#587796"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-vk',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
};
</script>
