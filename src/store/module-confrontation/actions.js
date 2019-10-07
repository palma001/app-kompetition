/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export function getConfrontations ({ commit }, payload) {
  const { eventId, phaseId, vm } = payload
  vm.$services.getData(['events', eventId, phaseId, 'confrontation'])
    .then(res => {
      console.log(res)
      commit('updateStateConfrontation', res.response.data)
    })
}
