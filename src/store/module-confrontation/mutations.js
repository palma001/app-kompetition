/**
 * Sets data of confrontations
 * @param  {Object} state
 * @param  {Object} payload
 */
export function updateStateConfrontation (state, payload) {
  state.confrontations = payload[0]
}
