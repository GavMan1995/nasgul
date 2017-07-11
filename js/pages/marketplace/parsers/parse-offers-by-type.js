import uniq from 'lodash.uniq'

export default function parseOffersByType (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse offers')
    console.error(error)
  }

  const offers = data.data || []
  const offersByType = {}

  offers.forEach((offer) => {
    if (!offersByType[offer.offer_type.name]) offersByType[offer.offer_type.name] = []

    offersByType[offer.offer_type.name].push(offer)
  })

  return {
    loanTypesCount: uniq(offers.map((offer) => offer.offer_type.name)).length,
    personalOffers: offers,
    offersByType
  }
}
