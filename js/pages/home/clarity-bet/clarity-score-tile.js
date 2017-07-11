import React from 'react'

import ScoreDonut from '../components/score-donut'

export default function ClarityScoreTile ({ me, score }) {
  // CLARITY BET
  let scoreAsterisk = null

  if (/[A-Z]/.test(score.score)) {
    scoreAsterisk = (
      <span className='c-dashboard__score-upgrade-asterisk'>*</span>
    )
  }

  return (
    <div className='c-dashboard__score-container'>
      <a
        href={`/app/reports/${score.report_pull_id}/analyze`}
        data-flex--container='true column'
        data-flex--item='grow--1'
        className='score-tile'
        onClick={() => trackInteraction(me.email, score)}>
        <div
          className='score-logo'
          data-flex--container='true'
          data-flex--item='grow--1'>
          <img src={`https://dxkdvuv3hanyu.cloudfront.net/images/${bureauSlug(score) || 'blank'}-logo.png`} />
        </div>

        <div
          data-flex--container='true'
          data-flex--item='grow--1'
          className='score-container'>
          <div className='donut-container'>
            <div className='donutScoreName'>
              <div className='donutScore js-private'>
                {prettyScore(score.score)}
                {scoreAsterisk}
              </div>
              <div className='donut-score-quality'>
                {prettyLevel(score.level)}
              </div>
            </div>

            <div className='donutChart'>
              <ScoreDonut
                width={100}
                strokeWidth={8}
                value={score.score}
                max={score.max}
                level={score.level} />
            </div>
          </div>
        </div>

        <div
          data-flex--container='true space-around-items'
          data-flex--item='grow--1'
          className='score-addons'>
          <div>
            <p className='score-subhead'>MAX</p>
            <h5 className='score-addon-item'>{score.max}</h5>
          </div>
          <div>
            <p className='score-subhead'>{prettyChangeDirection(score.change)}</p>
            <h5 className='score-addon-item'>
              {prettyChange(score.change)}
              <span className={`fa fa-caret-${prettyChangeDirection(score.change)}`} />
            </h5>
          </div>
        </div>

        <div data-flex--container='true center' className='tile-footer'>
          <p className='text-uppercase text-center'>See the Report</p>
        </div>
      </a>
    </div>
  )
}

function bureauSlug (score) {
  if (score.bureau === 'Dun & Bradstreet') {
    return 'dandb'
  } else if (score.bureau) {
    return score.bureau.toLowerCase()
  } else {
    return 'unknown'
  }
}

function prettyChange (change) {
  if (!change) return 'N/A'

  return Math.abs(change)
}

function prettyChangeDirection (change) {
  if (!change) return 'change'

  if (change > 0) {
    return 'up'
  } else {
    return 'down'
  }
}

function prettyLevel (level) {
  if (!level) return 'N/A'

  if (level === 'no_data') return level.replace('_', ' ')

  return level[0].toUpperCase() + level.slice(1)
}

function prettyScore (score) {
  if (score === 0) return '?'

  return score
}

function trackInteraction (userId, score) {
  window.analytics.track('Card Interaction', {
    userId,
    category: 'Dashboard:Score',
    action: 'Click:ViewReport',
    label: `${score.bureau} - ${score.type}`
  })
}
