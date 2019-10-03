export function getQuestion (state) {
  return state.question[Math.floor(Math.random() * 6)]
}
