export default function asideOffersLoaded (state = false, action) {
  switch (action.type) {
    case 'FETCH_ASIDE_OFFERS':
      return false
    case 'RECEIVE_ASIDE_OFFERS':
      return true
    default:
      return state
  }
}
