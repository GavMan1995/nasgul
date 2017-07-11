export default function parseInstitutionResults (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse bank search results')
    console.error(error)
  }

  const banks = data.data

  return {
    institutions: banks.map((bank) => {
      return {
        id: bank.id,
        type: bank.type,
        name: bank.attributes.name,
        popularity: bank.attributes.popularity,
        url: bank.attributes.url
      }
    })
  }
}
