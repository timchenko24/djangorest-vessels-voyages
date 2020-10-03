<template>

  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >

    <template v-slot:activator="{ on, attrs }">

      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>

    </template>

    <v-date-picker
      v-model="date"
      :allowed-dates="allowedDates"
      :min="minDate"
      :max="maxDate"
      no-title
      scrollable
    >

      <v-spacer></v-spacer>

      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>

      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date); $emit('onChange', date)"
      >
        OK
      </v-btn>

    </v-date-picker>

  </v-menu>

</template>

<script>
export default {
  name: 'Datepicker',

  props: {
    label: {
      type: String,
    },

    dates: {
      type: Array,
      required: true,
    },

    minDate: {
      type: String,
      required: true,
    },

    maxDate: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    date: '',
    menu: false,
  }),

  methods: {
    allowedDates(val) {
      for (let i = 0; i < this.dates.length; i++) {
        if (this.dates[i] === val) {
          return val;
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
