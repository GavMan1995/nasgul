export default function frequency (state = 'monthly', action) {
  switch (action.type) {
    case 'TOGGLE_FREQUENCY':
      return action.frequency
    default:
      return state
  }
}
