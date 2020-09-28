<template>
  <v-layout row wrap>

    <v-flex md8 class="pa-5 text-left">

      <v-select
        v-model="sortBy"
        solo
        :items="titles"
        :label="label"
        @change="sort"
      ></v-select>

    </v-flex>

    <v-spacer></v-spacer>

    <v-flex md3 class="pa-5 text-right">

      <v-btn-toggle
        v-model="sortByDesc"
        @change="sort"
        mandatory
      >

        <v-btn
          large
          outlined
          color="indigo"
          :value="false"
        >

          <v-icon>mdi-arrow-up</v-icon>

        </v-btn>

        <v-btn
          large
          outlined
          color="indigo"
          :value="true"
        >

          <v-icon>mdi-arrow-down</v-icon>

        </v-btn>

      </v-btn-toggle>

    </v-flex>

  </v-layout>
</template>

<script>

export default {
  name: 'SortBy',

  props: {
    keys: {
      type: Object,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      sortBy: Object.keys(this.keys)[0],
      sortByDesc: false,
    };
  },

  methods: {
    sort() {
      const key = this.getKeyByTitle();
      this.$emit('onChange', { key, isString: this.keys[key].isString, sortByDesc: this.sortByDesc });
    },

    getKeyByTitle() {
      let key;
      Object.entries(this.keys).forEach(([k, v]) => {
        if (v.title === this.sortBy) {
          key = k;
        }
      });
      return key;
    },
  },

  computed: {
    titles() {
      return Object.values(this.keys).map((value) => value.title);
    },
  },
};
</script>

<style scoped>

</style>
