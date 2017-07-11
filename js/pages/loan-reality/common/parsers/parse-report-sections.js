export default function parseReportSections (rawBody) {
  let data = []

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const sectionSchemas = data.included.report_section_schemas
  const sections = data.data
  const reportSections = sections.map((section) => {
    return {
      id: section.id,
      code: section.attributes.code,
      points: section.attributes.points,
      items: section.relationships.report_items.map((item) => item.id),
      schema: reportSectionSchema(section, sectionSchemas)
    }
  }).sort((a, b) => b.schema.weight - a.schema.weight)

  return {
    reportSections: reportSections.map((section, index) => {
      let importanceText = 'Fairly Important'

      if (index === 0) importanceText = 'Most Important'
      if (index === 1) importanceText = 'Very Important'
      if (index === 2) importanceText = 'Important'

      section.importanceText = importanceText

      return Object.assign({}, section, gaugeItems(section.points))
    })
  }
}

function reportSectionSchema (reportSection, schemas) {
  const sectionSchema = schemas.filter((schema) => {
    return schema.id === reportSection.relationships.report_section_schema.id
  })[0]

  return {
    name: sectionSchema.attributes.name,
    description: sectionSchema.attributes.description,
    code: sectionSchema.attributes.code,
    weight: sectionSchema.attributes.weight
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

  if (level <= 100 && level >= 76) {
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
