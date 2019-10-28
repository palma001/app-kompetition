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
  ], { status: 'TOPLAY' })
  let { response } = await vm.$services.getData(
    [
      'phase',
      phases['response']['data'][0]['id'],
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  dispatch('getSorting', { vm: vm })
  vm.$socket.emit('confrontations', response.data)
}
/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontationsPlaying ({ commit, dispatch }, payload) {
  const { params, vm } = payload
  let events = await vm.$services.getData(['events'], { done: false })
  let phases = await vm.$services.getData([
    'events',
    events['response']['data'][0]['id'],
    'phase'
  ], { status: 'TOPLAY' })

  let { response } = await vm.$services.getData(
    [
      'phase',
      phases['response']['data'][0]['id'],
      'confrontation'
    ],
    (params.query) ? params.query : {}
  )
  if (response['data'].length === 0) {
    dispatch('updatePhase', {
      phase: phases['response']['data'][0]['id'],
      vm: vm,
      event: events['response']['data'][0]['id']
    })
  }
  vm.$socket.emit('confrontationsPlaying', response.data)
}
export async function getSorting ({ commit }, payload) {
  let { vm } = payload
  let { response } = await vm.$services.getData(['phase', 0, 'confrontation'])
  vm.$socket.emit('sorting', response.data)
}
export function addStartTime ({ commit }, payload) {
  const { vm, params } = payload
  vm.$services.postData([''], params.request)
    .then(res => {
      return res.response.data
    })
}

export async function updatePhase ({ commit }, payloada) {
  let { phase, vm, event } = payloada
  let data = await vm.$services.putData(
    [
      'events',
      event,
      'phase',
      phase
    ],
    {
      status: 'PLAYED'
    }
  )
  console.log(data)
}
