export default function activeProfile (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_BUSINESS_PROFILE':
      return action.profile
    default:
      return state
  }
}
