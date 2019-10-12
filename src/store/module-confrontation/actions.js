/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontations ({ commit, dispatch }, payload) {
  const { params, vm } = payload
  // vm.$services.getData(['events', eventId, 'phase'], status)
  //   .then(res => {
  let { response } = await vm.$services.getData(
    [
      'events',
      params.eventId,
      params.phaseId,
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  vm.$socket.emit('confrontations', response.data)
  // })
}
/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontationsPlaying ({ commit }, payload) {
  const { params, vm } = payload
  // vm.$services.getData(['events', eventId, 'phase'], status)
  //   .then(res => {
  let { response } = await vm.$services.getData(
    [
      'events',
      params.eventId,
      params.phaseId,
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  vm.$socket.emit('confrontationsPlaying', response.data)
  // })
}
