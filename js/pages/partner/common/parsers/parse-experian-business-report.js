export default function parseExperianBusinessReport (rawBody) {
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
