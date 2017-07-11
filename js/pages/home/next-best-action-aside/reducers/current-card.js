export default function currentCard (state = 'initial_card', action) {
  switch (action.type) {
    case 'SET_CURRENT_CARD':
      return action.name
    default:
      return state
  }
}
