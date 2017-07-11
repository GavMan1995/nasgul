export default function AlertOffer (state = false, action) {
  switch (action.type) {
    case 'RECEIVE_ALERT_OFFER':
      return action.offer
    default:
      return state
  }
}
