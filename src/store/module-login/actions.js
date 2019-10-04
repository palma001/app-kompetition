/**
 * Login Session
 * @param {Object} context
 * @param {Object} credentials user
 */
export function login ({ commit, dispatch }, payload) {
  payload.this.$_authLibrary
    .login(payload.credentials)
    .then(res => {
      if (!res) {
        payload.this.$q.notify({
          position: 'center',
          color: 'negative',
          icon: 'report_problem',
          message: 'Los datos son incorrectos.'
        })
      } else {
        payload.this.$services.setAxiosHeader(
          'Authorization',
          localStorage.getItem('TOKEN')
        )
        payload.this.$services
          .getData(['users', res.data])
          .then(res => {
            commit('updateData', res.response.data)
          })
        commit('updateToken', res.token)
        payload.this.$router.push({ path: '/scoreKeeper' })
      }
      payload.this.submitting = false
    })
}
/**
 * Logout Session
   * @param {Object} context
 */
export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    if (this.state.token !== null) {
      commit('removeToken')
      resolve()
    }
  })
}
