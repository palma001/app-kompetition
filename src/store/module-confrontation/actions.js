/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export function getConfrontations ({ commit }, payload) {
  const { params, vm } = payload
  // vm.$services.getData(['events', eventId, 'phase'], status)
  //   .then(res => {
  vm.$services.getData(
    ['events', params.eventId, params.phaseId, 'confrontation'],
    (params.query) ? params.query : {}
  )
    .then(res => {
      commit('updateStateConfrontation', res.response.data)
      return res.response.data
    })
    // })
}
