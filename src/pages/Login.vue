<template>
  <q-page class="bg-primary">
    <div class="row justify-center">
      <div class="col-auto">
        <div class="q-pa-xl bg-login bg-login">
          <img src="~assets/petro.svg" style="height: 150px; margin-left: 30%">
          <q-input
            filled
            ref="user"
            v-model="credentials.user"
            label="Usuario"
            name="user"
            lazy-rules
            @keyup.enter.native="login"
            :rules="[ val => val && val.length > 0 || 'El campo usuario no puede estar vacio']" />
          <q-input
            v-model="credentials.password"
            ref="password"
            filled
            label="Contraseña"
            name="password"
            :rules="[ val => val && val.length > 0 || 'El campo contraseña no puede estar vacio']"
            :type="isPwd ? 'password' : 'text'"
            @keyup.enter.native="login">
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row justify-end">
            <q-btn
              style="width: 150px"
              label="Login"
              class="q-mt-md q-mr-sm"
              color="primary"
              :loading="submitting"
              @click="login"
            >
              <template v-slot:loading>
                Cargando...
              </template>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-toolbar>
      <img src="../assets/speTrans.png"
        style="height: 150px; position: fixed; bottom: 1px; opacity:0.4">
    </q-toolbar>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      /**
       * visible password
       * @type {Boolean}
       */
      isPwd: true,
      /**
       * user credentials
       * @type {object}
       */
      credentials: {
        user: null,
        password: null
      },
      /**
       * Loading status
       * @type {Boolean}
       */
      submitting: false
    }
  },
  methods: {
    /**
     * return error when field is empty
     * @param {string}
     */
    errorValidation (field) {
      return this.errors.has(field) ? 'is-danger' : null
    },
    /**
     * Login app
     */
    login () {
      this.$refs.user.validate()
      this.$refs.password.validate()
      if (this.$refs.user.hasError || this.$refs.password.hasError) {
        this.formHasError = true
      } else {
        this.submitting = true
        this['login/login'](
          {
            credentials: this.converUppercase(this.credentials),
            this: this
          }
        )
      }
    },
    /**
     * Convert upper case
     * @param {Object} data
     */
    converUppercase (data) {
      let model = {}
      for (let string in data) {
        if (data[string]) {
          model[string] = data[string].toUpperCase()
        }
      }
      return model
    },
    ...mapActions(['login/login'])
  }
}
</script>

<style lang="css" scoped>
.bg-login {
  width: 550px;
  margin-top: 50%;
  border-radius: 4px;
  background: white;
  opacity: 0.9;
}
</style>
