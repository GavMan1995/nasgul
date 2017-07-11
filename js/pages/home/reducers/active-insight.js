export default function activeInsight (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_INSIGHT_DATA':
      return action.insights[0] || {}
    case 'SET_ACTIVE_INSIGHT':
      return action.insight || state
    default:
      return state
  }
}
