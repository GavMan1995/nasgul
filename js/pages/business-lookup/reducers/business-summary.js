export default function businessSummary (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_BUSINESS_SUMMARY':
      return action.data
    default:
      return state
  }
}
