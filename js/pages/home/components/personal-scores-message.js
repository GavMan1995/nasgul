import React from 'react'

export default function PersonalScoresMessage ({ me, personalScores }) {
  if (personalScores.length > 0) return null

  if (me.idVerifyState !== 'not_verified') {
    return (
      <div className='c-dashboard__no-score'>
        <h3>There doesn't seem to be anything here!</h3>
        <p>
          Contact Customer Support at <a href='tel:8552268388'>855-226-8388</a> for help setting up your account.
        </p>
      </div>
    )
  } else {
    return (
      <div className='c-dashboard__no-score'>
        <h3>Add personal information to get a personal report!</h3>
        <a
          href='/app/profile'
          target='_self'
          className='c-btn c-btn--primary'>
          Update Your Profile
        </a>
      </div>
    )
  }
}
