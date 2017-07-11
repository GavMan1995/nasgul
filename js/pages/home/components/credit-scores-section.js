import React from 'react'

import BusinessScoresMessage from './business-scores-message'
import PersonalScoresMessage from './personal-scores-message'
import ScoreTile from './score-tile'

export default function CreditScoresSection (props) {
  const { activeBusiness, me, businessScores, personalScores } = props

  return (
    <section className='c-dashboard__container'>
      <div className='c-card'>
        <div className='c-card__header'>
          <div className='c-dashboard__score-title'>
            <h3>Business Scores</h3>
            <p>{activeBusiness.name}</p>
          </div>
        </div>

        <div className='c-card__content'>
          {businessScores.map((score, index) => {
            return <ScoreTile key={index} me={me} score={score} />
          })}

          <BusinessScoresMessage
            activeBusiness={activeBusiness}
            businessScores={businessScores} />
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
            return <ScoreTile key={index} me={me} score={score} />
          })}

          <PersonalScoresMessage me={me} personalScores={personalScores} />
        </div>
      </div>
    </section>
  )
}
