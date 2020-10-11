<template>

  <v-container fill-height>

    <v-row justify="center" align="center">

      <v-col cols="12" md="7">

        <v-alert v-for="(alert, index) in allAlerts"
          dense
          outlined
          :type="alert.type"
          class="text-center"
          :key="index"
        >
          {{alert.text}}
        </v-alert>

        <v-card class="px-4" min-width="316px">
          <v-card-text>
            <v-form v-model="valid" ref="loginForm" lazy-validation>

              <v-row>

                <v-col cols="12">
                  <v-text-field label="Имя пользователя" v-model="login" :rules="[rules.required]"
                    maxlength="20" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Пароль" v-model="password"
                    :rules="[rules.required]"
                    type="password"
                    name="input-10-1">
                  </v-text-field>
                </v-col>

                <v-spacer></v-spacer>

                <v-col cols="12">
                  <v-btn x-medium block color="primary"
                    :disabled="!valid" @click="validate">Войти</v-btn>
                </v-col>
              </v-row>

            </v-form>
          </v-card-text>
        </v-card>

      </v-col>

    </v-row>

  </v-container>

</template>

<script>
// import axios from 'axios';
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      valid: true,
      login: '',
      password: '',

      show: false,
      alerts: [],
      alertType: '',

      rules: {
        required: (value) => !!value || 'Обязательно',
      },
    };
  },

  methods: {
    ...mapActions(['obtainToken']),
    ...mapMutations(['updateToken']),
    validate() {
      if (this.$refs.loginForm.validate()) {
        const payload = {
          username: this.login,
          password: this.password,
        };
        this.obtainToken(payload);
        // const body = {
        //   username: this.login,
        //   password: this.password,
        // };
        //
        // axios.post('http://localhost:8000/auth/obtain_token/', body)
        //   .then(() => {
        //     this.alerts.push('Вы успешно выполнили вход!');
        //     this.alertType = 'success';
        //     this.$refs.loginForm.reset();
        //   })
        //   .catch((e) => {
        //     this.alerts = Object.values(e.response.data).map((value) => value[0]);
        //     this.alertType = 'error';
        //   });
      }
    },
  },

  computed: {
    ...mapGetters(['allAlerts']),
  },
};
</script>

<style scoped>

</style>
