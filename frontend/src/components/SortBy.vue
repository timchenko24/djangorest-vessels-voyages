<template>
  <v-layout row wrap>

    <v-flex md8 class="pa-5 text-left">

      <v-select
        v-model="sortBy"
        solo
        :items="keysTitles"
        :label="label"
        @change="sort"
      ></v-select>

    </v-flex>

    <v-spacer></v-spacer>

    <v-flex md3 class="pa-5 text-right">

      <v-btn-toggle
        v-model="sortDesc"
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

    items: {
      type: Array,
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
      sortDesc: false,
    };
  },

  methods: {
    sort() {
      const key = this.getKeyByTitle();

      if (this.sortDesc) {
        if (this.keys[key].isString) {
          this.items.sort((a, b) => this.sortTextFieldByDesc(a[key], b[key]));
        }
        this.items.sort((a, b) => b[key].value - a[key].value);
      } else {
        if (this.keys[key].isString) {
          this.items.sort((a, b) => this.sortTextFieldByAsc(a[key], b[key]));
        }
        this.items.sort((a, b) => a[key].value - b[key].value);
      }
      this.$emit('onChange', this.items);
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

    sortTextFieldByAsc(a, b) {
      const strA = a.value.toLowerCase();
      const strB = b.value.toLowerCase();
      if (strA < strB) {
        return -1;
      }
      if (strA > strB) {
        return 1;
      }
      return 0;
    },

    sortTextFieldByDesc(a, b) {
      const strA = a.value.toLowerCase();
      const strB = b.value.toLowerCase();
      if (strA < strB) {
        return 1;
      }
      if (strA > strB) {
        return -1;
      }
      return 0;
    },
  },

  computed: {
    keysTitles() {
      return Object.values(this.keys).map((value) => value.title);
    },
  },
};
</script>

<style scoped>

</style>
