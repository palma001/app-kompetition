// const testDelay = (result, ms) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(result)
//     }, ms)
//   })
// }

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
        payload.this.$services.getData(['users', res.data])
          .then(data => {
            dispatch('updateStore', data)
          })
      }
      payload.this.submitting = false
    })
}
export function updateStore ({ commit }, payload) {
  commit('someMutation', payload)
}
