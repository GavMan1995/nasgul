export default function parseBorrowingPower (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const borrowingPower = data.data[0] || {}

  return { borrowingPower }
}
