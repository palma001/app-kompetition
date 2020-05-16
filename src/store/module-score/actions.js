/**
 * Sets value of table
 * @param {Object} options.commit context
 * @param {Object} payload data of table
 */
export function addQuestionRound ({ commit }, payload) {
  const newPayload = { ...payload }
  commit('mutationsQuestionRound', newPayload)
}
