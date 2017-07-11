import React from 'react'

export default function ScoreSectionWhatScoreMeans ({ report }) {
  return (
    <div className='c-enterprise-score__section'>
      <h4 className='c-enterprise-score__header'>
        <strong>What Your Score Means</strong>
      </h4>
      <p>
        Quite simply, the Intelliscore Plus&#8480; V2 credit score is a statistically
        based credit-risk evaluation. The main purpose of Intelliscore Plus
        is to help businesses, investors and potential lenders make well
        educated decisions about who they should or should not do business with.
      </p>

      <div className='c-enterprise-score__days-beyond-terms-container'>
        <p className='c-enterprise-score__header'>
          <strong>Days Beyond Terms</strong>
        </p>

        <div className='c-enterprise-score__days-beyond-terms'>
          <h3>0</h3>
          <small>Current</small>
        </div>

        <div className='c-enterprise-score__days-beyond-terms'>
          <h3>1</h3>
          <small>Average</small>
        </div>

        <div className='c-enterprise-score__days-beyond-terms'>
          <h3>7</h3>
          <small>Highest</small>
        </div>
      </div>
    </div>
  )
}
