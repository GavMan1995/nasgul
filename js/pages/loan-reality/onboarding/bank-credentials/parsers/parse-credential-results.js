export default function parseCredentialResults (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse bank credential results')
    console.error(error)
  }

  const credentials = data.data

  return {
    credentials: credentials.map((cred) => {
      return {
        id: cred.id,
        type: cred.type,
        label: cred.attributes.label,
        displayOrder: cred.attributes.popularity,
        inputType: cred.attributes.field_type,
        attachment: cred.attributes.attachment,
        mfaType: cred.attributes.mfa_type,
        optional: cred.attributes.optional
      }
    })
  }
}
