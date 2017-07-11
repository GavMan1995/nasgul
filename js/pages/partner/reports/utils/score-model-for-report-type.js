export default function scoreModelForReportType (scores, type) {
  return scores.filter((score) => {
    return score.model.includes('Intelliscore') || score.model.includes('paydex')
  })[0] || {}
}
