/**
 * Set value the table questionRound
 * @param  {Object} state
 * @return {Array} table data
 */
export function questionRoundGetter (state) {
  const table = []
  state.tableRound.forEach((element, index) => {
    table.push({
      QID: element['question']['questionId'],
      QT: element['question'].type,
      A: element['A'],
      B: element['B']
    })
  })
  return table
}
