export default function personalAlerts (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_ALL_ALERTS':
      return action.alerts.personal.map((alert) => {
        return {
          bureau: alert.bureau,
          code: alert.code,
          date: alert.date,
          description: alert.description,
          descriptionText: alert.description_text,
          name: alert.name,
          type: 'personal'
        }
      })
    default:
      return state
  }
}
