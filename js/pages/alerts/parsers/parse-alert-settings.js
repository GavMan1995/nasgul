export default function parseAlertSettings (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alert settings')
    console.error(error)
  }

  const profile = data.profile || {}
  const member = profile.member || { emails: [] }
  const alertSettings = member.alert_settings || {
    derogatory: {},
    score_change: {},
    amount_change: {},
    other: {}
  }
  const emails = member.emails.map(({ id, address, is_primary }) => {
    return { id, address, isPrimary: is_primary }
  }).sort((a, b) => {
    if (a.address.toUpperCase() < b.address.toUpperCase()) return -1

    if (a.address.toUpperCase() > b.address.toUpperCase()) return 1

    return 0
  })

  return {
    alertEmails: emails,
    alertSettings: {
      id: alertSettings.id,
      receiveDerogatoryEmails: alertSettings.derogatory.email,
      receiveScoreChangeEmails: alertSettings.score_change.email,
      receiveAmountChangeEmails: alertSettings.amount_change.email,
      receiveOtherEmails: alertSettings.other.email
    }
  }
}
