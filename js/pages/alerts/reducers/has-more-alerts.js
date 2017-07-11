export default function hasMoreAlerts (state = false, action) {
  switch (action.type) {
    case 'RECEIVE_ALL_ALERTS':
      return false
    default:
      return state
  }
}
