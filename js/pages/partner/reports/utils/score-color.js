import danbScoreColor from './dandb-score-color'
import experianScoreColor from './experian-score-color'

export default function scoreColor (score, type) {
  switch (type) {
    case 'dun_and_bradstreet_report':
      return danbScoreColor(score)
    case 'experian_business_report':
      return experianScoreColor(score)
    default:
      return '#8A9097'
  }
}
