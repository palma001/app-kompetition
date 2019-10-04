/**
 * Update token
 * @param  {Object} state
 * @param  {Object} payload token
 */
export function updateToken (state, payload) {
  state.token = payload
}
/**
 * Reset token in state
 * @param  {Object} state
 */
export function removeToken (state) {
  state.token = null
  state.name = null
  state.lastname = null
  state.rols = null
  localStorage.removeItem('TOKEN')
  localStorage.removeItem('name')
  localStorage.removeItem('lastname')
  localStorage.removeItem('rols')
}

/**
 *
 */
export function updateData (state, payload) {
  state.name = payload.name
  state.lastname = payload.lastname
  state.rols = payload.rols
  localStorage.setItem('rols', payload.rols)
  localStorage.setItem('name', payload.name)
  localStorage.setItem('lastname', payload.lastname)
}
