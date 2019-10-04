<template>
  <q-page class="bg-primary">
    <div class="row justify-center">
      <div class="col-auto">
        <div class="q-pa-xl bg-white"
          style="width: 550px; margin-top: 50%; border-radius: 4px">
          <div class="title text-center">
            Login
          </div>
          <q-input
            filled
            ref="user"
            v-model="credentials.user"
            label="Usuario"
            name="user"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'El campo usuario no puede estar vacio']" />
          <q-input
            v-model="credentials.password"
            ref="password"
            filled
            label="Contraseña"
            name="password"
            :rules="[ val => val && val.length > 0 || 'El campo contraseña no puede estar vacio']"
            :type="isPwd ? 'password' : 'text'">
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
            credentials: this.credentials,
            this: this
          }
        )
      }
    },
    ...mapActions(['login/login'])
  }
}
</script>

<style lang="css" scoped>
</style>
