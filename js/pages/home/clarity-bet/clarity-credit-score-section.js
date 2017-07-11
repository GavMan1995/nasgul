import React from 'react'

import BusinessScoresMessage from '../components/business-scores-message'
import PersonalScoresMessage from '../components/personal-scores-message'
import ClarityScoreTile from './clarity-score-tile'

// CLARITY BET
import UpgradeTile from './upgrade-tile'

export default function ClarityCreditScoresSection (props) {
  const { activeBusiness, me, businessScores, personalScores, plan } = props

  // CLARITY BET
  let upgradeMessage = ''

  if (businessScores.length > 0 && (plan.name === 'Standard' || plan.name === 'Essential')) {
    upgradeMessage = (
      <div className='c-dashboard__score-upgrade-copy'>
        <span>*</span>
        <p>
          Full business scores are available on our paid accounts:&nbsp;
          <a href='app/upgrade/premium'
            onClick={() => {
              window.analytics.track('Feature Click', {
                category: 'Internal Link',
                name: 'Clarity: Asterisk Plans',
                label: 'Clarity: Asterisk Plans-Premium'
              })
            }}>
            premium
          </a>
          &nbsp;and
          <a href='/app/upgrade/premium-plus'
            onClick={() => {
              window.analytics.track('Feature Click', {
                category: 'Internal Link',
                name: 'Clarity: Asterisk Plans',
                label: 'Clarity: Asterisk Plans-Premium Plus'
              })
            }}>
            premium plus
          </a>
        </p>
      </div>
    )
  }

  return (
    <section className='c-dashboard__container'>
      <div className='c-card'>
        <div className='c-card__header'>
          <div className='c-dashboard__score-title'>
            <h3>Business Scores</h3>
            <p>{activeBusiness.name}</p>
          </div>

          {upgradeMessage}
        </div>

        <div className='c-card__content'>
          {businessScores.map((score, index) => {
            return <ClarityScoreTile key={index} me={me} score={score} />
          })}

          <BusinessScoresMessage
            activeBusiness={activeBusiness}
            businessScores={businessScores} />

          {/* CLARITY BET */}
          <FicoUpgradeTile businessScores={businessScores} plan={plan} />
        </div>
      </div>

      <div className='c-card'>
        <div className='c-card__header'>
          <div className='c-dashboard__score-title'>
            <h3>Personal Scores</h3>
            <p>{`${me.firstName} ${me.lastName}`}</p>
          </div>
        </div>

        <div className='c-card__content'>
          {personalScores.map((score, index) => {
            return <ClarityScoreTile key={index} me={me} score={score} />
          })}

          <PersonalScoresMessage me={me} personalScores={personalScores} />

          {/* CLARITY BET */}
          <TransUnionUpgradeTile plan={plan} />
        </div>
      </div>
    </section>
  )
}

// CLARITY BET
function TransUnionUpgradeTile ({ plan }) {
  if (plan.name === 'Standard') {
    return <UpgradeTile bureau='transunion' maxScore='850' upgradePath='premium' />
  } else {
    return null
  }
}

function FicoUpgradeTile ({ businessScores, plan }) {
  if (plan.name === 'Premium Plus' || businessScores.length === 0) {
    return null
  } else {
    return <UpgradeTile bureau='fico' maxScore='300' upgradePath='premium-plus' />
  }
}
