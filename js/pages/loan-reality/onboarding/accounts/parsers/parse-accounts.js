export default function parseAccounts (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const accounts = data.data || []

  return { accounts }
}
