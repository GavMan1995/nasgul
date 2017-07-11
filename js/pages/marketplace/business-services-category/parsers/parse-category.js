export default function parseCategory (rawBody) {
  const body = JSON.parse(rawBody)

  return { offerCategory: body.data }
}
