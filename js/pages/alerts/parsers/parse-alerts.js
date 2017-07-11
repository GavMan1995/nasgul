export default function parseAlerts (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const alerts = data.alerts || { business: [], personal: [] }

  return {
    businessAlerts: alerts.business.map((alert) => {
      return {
        bureau: alert.bureau,
        code: alert.code,
        date: alert.date,
        description: alert.description,
        descriptionText: alert.description_text,
        name: alert.name,
        type: 'business'
      }
    }),
    hasMoreAlerts: data.more,
    personalAlerts: alerts.personal.map((alert) => {
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
  }
}
