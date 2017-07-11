export default function parseCreditScores (rawBody) {
  let data = {}

  try {
    data = JSON.parse(rawBody)
  } catch (error) {
    console.error('Failed to parse credit scores')
    console.error(error)
  }

  const scores = data.scores || []

  return {
    personalScores: scores.filter((score) => score.type === 'Personal'),
    businessScores: scores.filter((score) => score.type === 'Business')
  }
}
