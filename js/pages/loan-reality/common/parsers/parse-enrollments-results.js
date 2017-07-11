export default function parseEnrollmentsResults (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse bank enrollment results')
    console.error(error)
  }

  const enrollments = data.data || []

  return {
    enrollments: enrollments.map((enrollment) => {
      const { id, type } = enrollment
      const {
        user_id,
        institution_name,
        institution_id,
        status,
        status_message,
        status_message_code,
        last_refreshed_at
      } = enrollment.attributes

      const relationships = enrollment.relationships
      let mfaCredentials = []

      if (relationships && relationships.mfa_credentials.length > 0) {
        mfaCredentials = parseMFAResults(relationships.mfa_credentials)
      }

      return {
        id: id,
        type: type,
        userId: user_id,
        institutionName: institution_name,
        institutionId: institution_id,
        status: status,
        statusMessage: status_message,
        statusMessageCode: status_message_code,
        lastRefreshedAt: last_refreshed_at,
        mfaCredentials: mfaCredentials
      }
    })
  }
}

function parseMFAResults (credentials) {
  // This returns an array that is used inside the enrollment results
  if (!Array.isArray(credentials)) return []

  return credentials.map((cred) => {
    let options = []
    if (cred.relationships && cred.relationships.options.length > 0) {
      options = parseOptions(cred.relationships.options)
    }

    return {
      id: cred.id,
      type: cred.type,
      label: cred.attributes.label,
      displayOrder: cred.attributes.popularity,
      inputType: cred.attributes.field_type,
      attachment: cred.attributes.attachment,
      mfaType: cred.attributes.mfa_type,
      optional: cred.attributes.optional,
      options: options
    }
  })
}

function parseOptions (options) {
  if (!Array.isArray(options)) return []

  return options.map((option) => {
    return {
      id: option.id,
      type: option.type,
      label: option.attributes.label,
      value: option.attributes.value
    }
  })
}
