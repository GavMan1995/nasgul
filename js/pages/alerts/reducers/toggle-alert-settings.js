export default function toggleAlertSettings (state = false, action) {
  switch (action.type) {
    case 'EXPAND_ALERT_SETTINGS':
      return true
    case 'CLOSE_ALERT_SETTINGS':
      return false
    default:
      return state
  }
}
