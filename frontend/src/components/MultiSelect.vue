<template>

  <v-select
    v-model="selectedItems"
    :items="filterBy"
    :label="label"
    multiple
    @change="selectChanged"
  >

    <template v-slot:prepend-item>

      <v-list-item
        ripple
        @click="selectAbort"
      >

        <v-list-item-content>
          <v-list-item-title>Сбросить выбор</v-list-item-title>
        </v-list-item-content>

      </v-list-item>

      <v-divider class="mt-2"></v-divider>

    </template>

  </v-select>

</template>

<script>
export default {
  name: 'MultiSelect',

  data() {
    return {
      selectedItems: [],
    };
  },

  props: {

    filterBy: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
    },
  },

  methods: {

    selectAbort() {
      this.selectedItems = [];
      this.$emit('onAbort', false);
    },

    selectChanged() {
      this.$emit('onChange', this.selectedItems);
    },

  },
};
</script>

<style scoped>

</style>
