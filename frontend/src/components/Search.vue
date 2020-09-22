<template>
  <v-layout row wrap>
    <v-flex md12 class="pa-5">
      <v-text-field
        v-model="searchStr"
        prepend-inner-icon="mdi-magnify"
        label="Поиск"
        single-line
        solo
        clearable
        @input="doSearch"
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      searchStr: '',
    };
  },

  methods: {
    doSearch() {
      if (typeof this.searchStr !== 'string') {
        this.searchStr = '';
      }
      this.$emit('onSearch', this.searchStr);
    },
  },
};
</script>

<style scoped>

</style>
