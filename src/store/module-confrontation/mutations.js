/**
 * Sets data of confrontations
 * @param  {Object} state
 * @param  {Object} payload
 */
export function updateStateConfrontation (state, payload) {
  state.confrontations = payload[0]
}
/**
 * Sets data of all confrontations
 * @param  {Object} state
 * @param  {Object} payload
 */
export function updateStateAllConfrontation (state, payload) {
  state.allConfrontations = payload
}
