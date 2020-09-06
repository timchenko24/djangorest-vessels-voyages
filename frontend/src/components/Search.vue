<template>
  <v-layout row wrap>
    <v-flex md12 class="pa-5">
      <v-text-field
        v-model="search"
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

  props: {
    searchBy: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      search: '',
      searchState: false,
    };
  },

  methods: {

    doSearch() {
      if (typeof this.search !== 'string') {
        this.search = '';
      }
      const searchResult = this.searchBy.filter((item) => item.name.value.toLowerCase()
        .indexOf(this.search) !== -1);
      this.$emit('onSearch', searchResult);
    },
  },
};
</script>

<style scoped>

</style>
