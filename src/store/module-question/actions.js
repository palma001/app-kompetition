export function getRamdomQuestion ({ commit }, payload) {
  const { vm, params } = payload
  vm.$services.getData(['questions'], params)
    .then(res => {
      commit('setRandomQuestion', res.response.data)
    })
}
