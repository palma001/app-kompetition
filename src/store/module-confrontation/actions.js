/**
 * Message notify
 * @param  {String} icon     icon notify
 * @param  {String} color    color notify
 * @param  {String} position postions notify
 * @param  {String} message  message notify
 */
export function messageNotify (icon, color, position, message, vm) {
  vm.$q.notify({
    position: position,
    color: color,
    icon: icon,
    message: message
  })
}
/**
 * get events
 * @param  {Object}
 * @return {Array} all events
 */
export async function getEvents (vm, params) {
  try {
    let res = await vm.$services.getData(['events'], { ...params })
    if (!res.status) throw new Error('Error in server')
    if (res.response.status === 204) throw new Error('No events loaded')
    return res['response']['data']
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}
/**
 * Gets all phases
 * @param  {Object} services
 * @param  {Object} params
 * @return {Array} all phase
 */
export async function getPhases (services, params) {
  let { vm, paramsUrl } = services
  try {
    let res = await vm.$services.getData(['events', paramsUrl, 'phase'], { ...params })
    if (!res.status) throw new Error('Error in server')
    if (res.response.status === 204) throw new Error('No phase loaded')
    return res['response']['data']
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}
/**
 * Sets value of confrontation
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export async function getConfrontations ({ commit, dispatch }, payload) {
  const { params, vm } = payload
  try {
    let events = await getEvents(vm, { ...params.events })
    let phases = await getPhases({ vm: vm, paramsUrl: events[0]['id'] }, { ...params.phase })

    let res = await vm.$services.getData(
      [
        'phase',
        (params.requestPhases) ? phases[0]['id'] : 0,
        'confrontation'
      ],
      { ...params.query }
    )

    if (!res.status) throw new Error('Error in server')
    if (res.response.status === 204) throw new Error('No rounds')
    res['response']['data'].map(element => {
      element.eventId = events[0]['id']
    })
    return res['response']['data']
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}
/**
 * Get all the confrontations and add the score
 * @param  {Functions} options.commit
 * @param  {Function} options.dispatch
 * @param  {Object} payload
 * @return {Array} all confrontations
 */
export function getScoreTeam ({ commit, dispatch }, payload) {
  let { vm, data } = payload
  try {
    data.map(async (confrontation) => {
      if (confrontation.TeamA && confrontation.TeamB) {
        confrontation.TeamA.score = 0
        confrontation.TeamB.score = 0
      }
      let res = await vm.$services.getData(['confrontation', confrontation['id'], 'question-round'])
      return res['response']['data'].map(score => {
        if (confrontation['id'] === score['confrontationId']) {
          confrontation.TeamA.score += Number(score['scoreA'])
          confrontation.TeamB.score += Number(score['scoreB'])
        }
      })
    })
    return data
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}
/**
 * Gets questions rounds
 * @param  {Functions} options.commit
 * @param  {Function} options.dispatch
 * @param  {Object} payload
 * @return {Array}
 */
export async function getDetailsRound ({ commit, dispatch }, payload) {
  let { vm, data } = payload
  try {
    let res = await vm.$services.getData(['confrontation', data['id'], 'question-round'])
    if (!res.status) throw new Error('Error in server')
    return res.response.data
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}

export async function addQuestionsRounds ({ commit, dispatch }, payload) {
  let { vm, data } = payload
  try {
    let questionRound = await vm.$services.postData(['confrontation', data['confrontationId'], 'question-round'], data)
    if (!questionRound.status) throw new Error('Error server')
  } catch (e) {
    messageNotify('report_problem', 'negative', 'center', e.message, vm)
  }
}
