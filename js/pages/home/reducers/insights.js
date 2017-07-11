export default function insights (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_INSIGHT_DATA':
      return action.insights
    default:
      return state
  }
}
