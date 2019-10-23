/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontations ({ commit, dispatch }, payload) {
  const { params, vm } = payload
  let events = await vm.$services.getData(['events'], { done: false })
  let phases = await vm.$services.getData([
    'events',
    events['response']['data'][0]['id'],
    'phase'
  ], { status: 'playing' })

  let { response } = await vm.$services.getData(
    [
      'phase',
      phases['response']['data'][0]['id'],
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  vm.$socket.emit('confrontations', response.data)
}
/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontationsPlaying ({ commit }, payload) {
  const { params, vm } = payload
  let events = await vm.$services.getData(['events'], { done: false })
  let phases = await vm.$services.getData([
    'events',
    events['response']['data'][0]['id'],
    'phase'
  ], { status: 'playing' })

  let { response } = await vm.$services.getData(
    [
      'phase',
      phases['response']['data'][0]['id'],
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  vm.$socket.emit('confrontationsPlaying', response.data)
}

export function getAllConfrontations ({ commit }, payload) {
  const { params, vm } = payload
  vm.$services.getData(
    [
      'events',
      params.eventId,
      params.phaseId,
      'confrontation'
    ],
    {
      status: params.status
    }
  )
    .then(res => {
      commit('updateStateAllConfrontation', res.response.data)
    })
}

export function addStartTime ({ commit }, payload) {
  const { vm, params } = payload
  vm.$services.postData([''], params.request)
    .then(res => {
      return res.response.data
    })
}
