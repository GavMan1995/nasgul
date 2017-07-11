// TODO: This parser NEEDS a test!!
// NOTE: Doubles as facehugger's `parse-personal-offers`
export default function parseOfferTypes (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse offer types')
    console.error(error)
  }

  const offerTypes = data.data || []

  return { offerTypes }
}
