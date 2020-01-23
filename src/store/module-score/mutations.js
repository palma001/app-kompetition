/**
 * Sets data of table
 * @param  {Object} state
 * @param  {Object} payload
 */
export function mutationsQuestionRound (state, payload) {
  state.tableRound = [...state.tableRound, payload]
}
