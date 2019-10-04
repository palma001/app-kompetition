/**
 * Gets question
 * @param  {Objecy} state
 * @return {Object} question
 */
export function getQuestion (state) {
  return state.question[Math.floor(Math.random() * 6)]
}

export function dataUser (state) {
  let data = {
    name: (state.name) ? state.name : '',
    lastname: (state.lastname) ? state.lastname : '',
    rols: (state.rols) ? state.rols : ''
  }
  return data
}
