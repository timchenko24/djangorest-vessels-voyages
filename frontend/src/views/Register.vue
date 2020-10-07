<template>

  <v-container fill-height>

    <v-row justify="center" align="center">

      <v-col cols="12" md="7">

        <v-alert v-for="(alert, index) in alerts"
          dense
          outlined
          :type="alertType"
          class="text-center"
          :key="index"
        >
          {{alert}}
        </v-alert>

        <v-card class="px-4" min-width="316px">
          <v-card-text>
            <v-form v-model="valid" ref="registerForm" lazy-validation>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Имя" v-model="firstName" maxlength="20">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Фамилия" v-model="lastName" maxlength="20">
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Имя пользователя" v-model="login" :rules="[rules.required]"
                    maxlength="20" required>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="E-mail" v-model="email"
                    :rules="[rules.required, rules.email]"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Пароль" v-model="password"
                    :append-icon="show ?'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :rules="[rules.required, rules.min]"
                    name="input-10-1"
                    hint="Минимум 8 символов"
                    counter
                    @click:append="show = !show"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Подтверждение пароля" v-model="verify"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    :rules="[rules.required, passwordMatch]"
                    name="input-10-1"
                    counter
                    @click:append="show = !show"></v-text-field>
                </v-col>

                <v-spacer></v-spacer>

                <v-col cols="12">
                  <v-btn x-medium block color="primary"
                    :disabled="!valid" @click="validate">Зарегистрироваться</v-btn>
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
import axios from 'axios';

export default {
  name: 'Register',

  data() {
    return {
      valid: true,
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      password: '',
      verify: '',

      show: false,
      alerts: [],
      alertType: '',

      rules: {
        required: (value) => !!value || 'Обязательно',
        min: (v) => (v && v.length >= 8) || 'Не менее 8 символов',
        email: (v) => /.+@.+\..+/.test(v) || 'Неверный формат E-mail',
      },
    };
  },

  methods: {
    validate() {
      if (this.$refs.registerForm.validate()) {
        const body = {
          username: this.login,
          password: this.password,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName,
        };

        axios.post('http://localhost:8000/users/', body)
          .then(() => {
            this.alerts.push('Пользователь зарегистрирован!');
            this.alertType = 'success';
            this.$refs.registerForm.reset();
          })
          .catch((e) => {
            this.alerts = Object.values(e.response.data).map((value) => value[0]);
            this.alertType = 'error';
          });
      }
    },
  },

  computed: {
    passwordMatch() {
      return () => this.password === this.verify || 'Пароли должны совпадать';
    },
  },
};
</script>

<style scoped>

</style>
