<template>

  <v-app>

    <Header />

    <v-content>

      <router-view/>

    </v-content>

    <Footer />

  </v-app>

</template>

<script>
import Header from './components/Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'App',
  components: { Footer, Header },
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
