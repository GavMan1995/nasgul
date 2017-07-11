export default function parseReportItems (rawBody) {
  let data = []

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const itemSchemas = data.included.report_item_schemas
  const items = data.data
  const reportItems = items.map((item) => {
    return {
      id: item.id,
      code: item.attributes.code,
      customerImportance: item.attributes.customer_importance,
      points: item.attributes.points,
      points_text: item.attributes.points_text,
      textValue: buildTextValue(item),
      value_type: item.attributes.value_type,
      schema: reportItemSchema(item, itemSchemas)
    }
  }).sort((a, b) => b.customerImportance - a.customerImportance)

  return {
    reportItems: reportItems.map((item, index) => {
      return Object.assign({}, item, gaugeItems(item.points))
    })

  }
}

function buildTextValue (item) {
  const value = item.attributes.value
  const valueType = item.attributes.value_type

  if (valueType === 'PERCENTAGE') return `${value}%`
  if (valueType === 'DAYS') return `${value} days`
  if (valueType === 'NUMBER') return value
  if (valueType === 'CENTS') {
    const number = Math.floor(value / 100)

    return `$${number.toLocaleString('en-US')}`
  }
  if (valueType === 'RATIO') {
    if (!Number.isInteger(value)) return 'Unknown'
    if (value > 1000) return 'Best'

    return value / 100
  }

  return value
}

function reportItemSchema (reportItem, schemas) {
  const reportSchema = schemas.filter((schema) => {
    return schema.id === reportItem.relationships.report_item_schema.id
  })[0]

  return {
    code: reportSchema.attributes.code,
    description: reportSchema.attributes.description,
    name: reportSchema.attributes.name,
    valueType: reportSchema.attributes.value_type,
    weight: reportSchema.attributes.weight
  }
}

// NOTE: Logic for determining Gauge text, image, and color. This should probably be easier to determine from the api.
function gaugeItems (level) {
  if (!Number.isInteger(level)) {
    return {
      gaugeImage: 'gauge-unknown.svg',
      gaugeText: 'UNKNOWN',
      gaugeTextClass: 'c-loan-reality-card__label--unknown'
    }
  }

  if (level >= 76 && level <= 100) {
    return {
      gaugeImage: 'gauge-excellent.svg',
      gaugeText: 'EXCELLENT',
      gaugeTextClass: 'c-loan-reality-card__label--good'
    }
  }

  if (level >= 51 && level <= 75) {
    return {
      gaugeImage: 'gauge-good.svg',
      gaugeText: 'GOOD',
      gaugeTextClass: 'c-loan-reality-card__label--good'
    }
  }

  if (level >= 26 && level <= 50) {
    return {
      gaugeImage: 'gauge-okay.svg',
      gaugeText: 'OKAY',
      gaugeTextClass: 'c-loan-reality-card__label--okay'
    }
  }

  if (level <= 25) {
    return {
      gaugeImage: 'gauge-bad.svg',
      gaugeText: 'POOR',
      gaugeTextClass: 'c-loan-reality-card__label--poor'
    }
  }

  return {
    gaugeImage: 'gauge-unknown.svg',
    gaugeText: 'UNKNOWN',
    gaugeTextClass: 'c-loan-reality-card__label--unknown'
  }
}
