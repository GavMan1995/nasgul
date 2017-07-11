export default function parseFeedItems (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse feed items')
    console.error(error)
  }

  return { feedItems: data.feed_items }
}
