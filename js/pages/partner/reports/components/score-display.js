import React from 'react'

import LastUpdatedMessage from '../components/last-updated-message'
import scoreColor from '../utils/score-color'
import scoreModelForReportType from '../utils/score-model-for-report-type.js'
import safeStringToNumber from '../utils/safe-string-to-number'
import CDNLogo from '../../../../common/components/cdn-logo'

export default function ScoreDisplay ({ report }) {
  const score = scoreModelForReportType(report.attributes.scores, report.type)
  const percentage = Math.floor((score.value / score.maximum_value) * 100)
  const color = scoreColor(score, report.type)
  const scoreValue = safeStringToNumber(score.value)

  let expReport = false
  let bureauIcon = <CDNLogo filename='dandb_328x48.png' />

  if (report.type === 'experian_business_report') {
    bureauIcon = <CDNLogo filename='experian.svg' />
    expReport = true
  }

  let riskCategory = score.risk_category
  if (!riskCategory || !riskCategory.toLowerCase().includes('risk')) {
    riskCategory = riskCategory + ' Risk'
  }
  if (scoreValue === 0) {
    riskCategory = 'High Risk'
  }
  if (!score.risk_category) {
    riskCategory = ''
  }

  return (
    <div className='c-enterprise-score__section c-enterprise-score__section--no-padding'>
      <div className='c-enterprise-score__provided-by'>
        <p>{formatScoreModel(score.model)} provided by</p>
        {bureauIcon}
      </div>

      <div className='c-enterprise-score-container'>
        <div className='c-enterprise-score__info'>
          <h1 style={{ color }}>{scoreValue}</h1>
          <h4 style={{ color }}>{riskCategory}</h4>
        </div>

        <div className='c-score-bar-container'>
          <div className='c-score-bar'>
            <div className={`c-score-bar__segment-container ${expReport ? 'c-score-bar__segment-container--experian-report' : ''}`}>
              <span className='c-score-bar__segment c-score-bar__segment--poor' />
              <span className='c-score-bar__segment c-score-bar__segment--semi-poor' />
              <span className='c-score-bar__segment c-score-bar__segment--fair' />
              <span className='c-score-bar__segment c-score-bar__segment--semi-good' />
              <span className='c-score-bar__segment c-score-bar__segment--good' />
            </div>

            <span
              className='c-score-bar__circle'
              style={{
                left: `calc(${percentage}% - 12px)`,
                borderColor: color
              }} />
          </div>

          <div className='c-score-bar__numbers'>
            <p>0</p>
            <p>20</p>
            <p>50</p>
            <p>80</p>
            <p>100</p>
          </div>
        </div>
      </div>

      <div className='c-enterprise-score__update-info'>
        <LastUpdatedMessage date={report.attributes.report_date} />
      </div>
    </div>
  )
}

function formatScoreModel (model) {
  if (model === 'Intelliscore plus v2') {
    return model.split('plus v').join('Plus\u2120 V')
  }

  return model.split('paydex').join('PAYDEX\u00AE')
}
