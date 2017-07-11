// TODO: This parser NEEDS a test!!
export default function parseSimilars (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse similars')
    console.error(error)
  }

  const bestSimilar = data.best_similar || {}
  const similars = data.similars || []

  // Experian and DandB return a different object with different data.
  // Only parsing what data we need at the moment.
  return {
    bestSimilar: {
      name: bestSimilar.name || bestSimilar.businessName,
      address: bestSimilar.address || bestSimilar.streetAddress,
      city: bestSimilar.city,
      state: bestSimilar.state,
      zip: bestSimilar.zip,
      experianFileNumber: bestSimilar.experianFileNumber,
      duns: bestSimilar.duns
    },
    allSimilars: similars.map((similar) => {
      return {
        name: similar.name || similar.businessName,
        address: similar.address || similar.streetAddress,
        city: similar.city,
        state: similar.state,
        zip: similar.zip,
        experianFileNumber: similar.experianFileNumber,
        duns: similar.duns
      }
    })
  }
}
