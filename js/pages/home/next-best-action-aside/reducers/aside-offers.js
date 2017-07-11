export default function asideOffers (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ASIDE_OFFERS':
      return action.offers
    default:
      return state
  }
}
