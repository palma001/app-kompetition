export function dataUser (state) {
  let data = {
    name: (state.name) ? state.name : '',
    lastname: (state.lastname) ? state.lastname : '',
    rols: (state.rols) ? state.rols : ''
  }
  return data
}
