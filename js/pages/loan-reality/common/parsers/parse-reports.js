export default function parseReports (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const report = data.data[0] || {}

  return {
    report: Object.assign({}, report, gaugeItems(report.attributes.points))
  }
}

// NOTE: Logic for determining Gauge text, image, and color. This should probably be easier to determine from the api.
// This is also replicated in 3 places.
function gaugeItems (level) {
  if (!Number.isInteger(level)) {
    return {
      gaugeImage: 'gauge-unknown.svg',
      gaugeText: 'UNKNOWN',
      gaugeTextClass: 'c-loan-reality-card__label--unknown',
      borrowingPowerText: ''
    }
  }

  if (level <= 100 && level >= 76) {
    return {
      gaugeImage: 'gauge-excellent.svg',
      gaugeText: 'EXCELLENT',
      gaugeTextClass: 'c-loan-reality-card__label--good',
      borrowingPowerText: 'Based on your bank records, your odds of getting approved for a loan are good!'
    }
  }

  if (level >= 51 && level <= 75) {
    return {
      gaugeImage: 'gauge-good.svg',
      gaugeText: 'GOOD',
      gaugeTextClass: 'c-loan-reality-card__label--good',
      borrowingPowerText: 'Based on your bank records, your odds of getting approved for a loan are good!'
    }
  }

  if (level >= 26 && level <= 50) {
    return {
      gaugeImage: 'gauge-okay.svg',
      gaugeText: 'OKAY',
      gaugeTextClass: 'c-loan-reality-card__label--okay',
      borrowingPowerText: 'Based on your bank records, your odds of getting approved for a loan are fair.'
    }
  }

  if (level <= 25) {
    return {
      gaugeImage: 'gauge-bad.svg',
      gaugeText: 'POOR',
      gaugeTextClass: 'c-loan-reality-card__label--poor',
      borrowingPowerText: 'Based on your bank records, your odds of getting approved for a loan are low.'
    }
  }

  return {
    gaugeImage: 'gauge-unknown.svg',
    gaugeText: 'UNKNOWN',
    gaugeTextClass: 'c-loan-reality-card__label--unknown',
    borrowingPowerText: ''
  }
}
