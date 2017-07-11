export default function alertSettings (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_ALERT_SETTING':
      return Object.assign({}, state, { [action.key]: !state[action.key] })
    default:
      return state
  }
}
