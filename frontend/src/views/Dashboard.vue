<template>
  <v-container fluid>
    <v-row class="pt-10">

      <v-col cols="12">
        <p class="display-3 text-center">Dashboard</p>
      </v-col>

    </v-row>
    <v-divider class="mx-4"></v-divider>
    <v-row justify="start">

      <v-col cols="4">
        <v-form v-model="valid" ref="clusteringForm" lazy-validation>
          <v-select label="Выберите датасет"
                    :items="Object.keys(datasetSection.options)"
                    @change="updateSelectedDataset"
                    :rules="[rules.required]"
          >
          </v-select>

          <v-select label="Выберите действие" class="mt-5"
                    :items="Object.keys(actionSection.options)"
                    @change="updateSelectedAction"
                    :rules="[rules.required]"
          >
          </v-select>

          <v-select label="Выберите способ преобразования данных" class="mt-5"
                    v-show="transformFuncSection.enabled"
                    :items="Object.keys(transformFuncSection.options)"
                    @change="updateSelectedTransformFunc"
                    :rules="[rules.required]"
          >
          </v-select>

          <v-select label="Выберите алгоритм" class="mt-5"
                    v-show="algSection.enabled"
                    :items="Object.keys(algSection.options)"
                    @change="updateSelectedAlg"
                    :rules="[rules.required]"
          >
          </v-select>

          <v-card
            v-show="algSection.selected === algSection.options['K-means']"
            flat
          >
            <v-subheader class="mb-5 px-0 subtitle-1">Число k</v-subheader>
            <v-slider
              @change="updateSelectedK"
              step="1"
              min="2"
              max="15"
              thumb-label="always"
              ticks
            ></v-slider>
          </v-card>

          <v-select label="Выберите метод связи" class="mt-5"
                    v-show="algSection.selected === algSection.options['Agglomerative']"
                    :items="Object.keys(linkages)"
                    @change="updateSelectedLinkage"
                    :rules="[rules.required]"
          >
          </v-select>

          <v-row justify="center">
            <v-btn :disabled="!valid" @click="getClusteredData" class="mt-5"
                   color="primary" dark>Get</v-btn>
          </v-row>

        </v-form>
      </v-col>

      <v-col cols="8">
        <v-row justify="center">{{clusteredData}}</v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Dashboard',

  data() {
    return {
      valid: true,
      k: 0,

      rules: {
        required: (value) => !!value || 'Обязательно',
      },
    };
  },

  methods: {
    ...mapActions(['getData', 'getClusteredData']),
    ...mapMutations(['updateSelectedAction', 'updateSelectedTransformFunc', 'updateSelectedDataset',
      'updateSelectedAlg', 'updateSelectedK', 'updateSelectedLinkage']),

    validate() {
      this.$refs.clusteringForm.validate();
    },
  },

  computed: {
    ...mapGetters(['transformFuncSection', 'actionSection', 'datasetSection', 'algSection',
      'clusteredData', 'linkages']),
  },

  async mounted() {
    await this.getData();
  },
};
</script>

<style scoped>

</style>
