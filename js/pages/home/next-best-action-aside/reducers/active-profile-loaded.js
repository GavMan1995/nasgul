export default function activeProfileLoaded (state = false, action) {
  switch (action.type) {
    case 'FETCH_BUSINESS_PROFILE':
      return false
    case 'RECEIVE_BUSINESS_PROFILE':
      return true
    default:
      return state
  }
}
