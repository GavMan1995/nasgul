// TODO: This parser NEEDS a test!!
export default function parseMarketplaceOptions (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse marketplace options')
    console.error(error)
  }

  return {
    marketplaceOptions: {
      offerTypes: data.offer_types,
      traits: data.traits
    }
  }
}
