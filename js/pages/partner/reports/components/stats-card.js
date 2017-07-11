
import React from 'react'

import scoreColor from '../utils/score-color'
import scoreModelForReportType from '../utils/score-model-for-report-type'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function StatsCard ({ report }) {
  // TODO: Move this up to the Redux level?
  const score = scoreModelForReportType(report.attributes.scores, report.type)
  const color = scoreColor(score, report.type) // This should be a different rank color?!

  if (!score.risk_rank) return null

  return (
    <div className='o-enterprise-info-container'>
      <div className='c-enterprise__info-header'>
        <div className='c-enterprise__info-header-img'>
          <CDNIcon filename='icon_ent_graph_24x24.svg' />
        </div>
        <h2>Stats</h2>
      </div>

      <div className='o-enterprise-card o-enterprise-card--align-vertical-center'>
        <div className='c-stat-number-card-section'>
          <h1 style={{ color }}>{score.risk_rank}%</h1>
        </div>

        <div className='o-enterprise-card__section o-enterprise-card__section--light-color'>
          <h3>
            Compared to other businesses, yours is {score.risk_rank}% more
            likely to have a severe delinquency.
          </h3>
        </div>
      </div>
    </div>
  )
}
