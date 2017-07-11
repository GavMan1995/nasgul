export default function parseHiddenAccounts (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse alerts')
    console.error(error)
  }

  const rawAccounts = data.data || []
  const accounts = rawAccounts.map((account) => {
    account.status = 'HIDDEN'
    return account
  })

  return { hiddenAccounts: accounts }
}
