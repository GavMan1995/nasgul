export default function parseDunAndBradStreetReport (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const report = data.data || {}

  return { report }
}
