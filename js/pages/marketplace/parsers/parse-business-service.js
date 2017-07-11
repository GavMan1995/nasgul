// TODO: This parser NEEDS a test!!
export default function parseBusinessServices (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse business services')
    console.error(error)
  }

  const offers = data.data || []

  return { offersByCategory: offers }
}
