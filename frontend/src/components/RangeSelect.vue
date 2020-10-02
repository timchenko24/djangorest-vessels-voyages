<template>
    <v-layout row wrap>

      <v-flex md6 class="pa-5">

        <v-text-field
          v-model.number="filter.dataSet[0]"
          :rules="[checkRange(ruleErrorText,filter.dataSet[0])]"
          label="От"
          :placeholder="limitMin"
          clearable
          @change='checkEmpty($event, 0)'
        ></v-text-field>

      </v-flex>

      <v-flex md6 class="pa-5">

        <v-text-field
          v-model.number="filter.dataSet[1]"
          :rules="[checkRange(ruleErrorText, filter.dataSet[1])]"
          label="До"
          :placeholder="limitMax"
          clearable
          @change='checkEmpty($event, 1)'
        ></v-text-field>

      </v-flex>

    </v-layout>
</template>

<script>
export default {
  name: 'RangeSelect',

  props: {
    filter: {
      type: Object,
      required: true,
    },
    limitMin: {
      type: [String, Number],
    },
    limitMax: {
      type: [String, Number],
    },
  },

  data() {
    return {
      ruleErrorText: 'Неверный ввод',
    };
  },

  methods: {
    checkEmpty(value, field) {
      if (!value) {
        this.filter.dataSet[field] = '';
        this.filter.enabled[field] = false;
      } else {
        this.filter.enabled[field] = true;
      }
    },

    checkRange(err, value) {
      return ((value >= this.limitMin && value <= this.limitMax) || !value)
          || err;
    },

    calculateRangeLimits(array, key) {
      return [Math.min(...array.map((item) => item[key])).toString(),
        Math.max(...array.map((item) => item[key])).toString()];
    },

  },
};
</script>

<style scoped>

</style>
