import React from 'react'

export default function ProgressBar ({ profileCompletion }) {
  const {
    businessTotal,
    businessFilled,
    financialTotal,
    financialFilled
  } = profileCompletion
  const filled = businessFilled + financialFilled
  const total = businessTotal + financialTotal
  const percent = Math.floor((filled / total) * 100) || 0

  return (
    <div data-flex--item='full p--md' className='_profile-progress'>
      <CompleteMessage percent={percent} />

      <div data-flex--item='full' data-flex--container='false'>
        <h6 data-flex--item='p-b--xs'>{percent}% Complete</h6>
        <div className={`progress -tall ${percent === 100 ? '-green' : '-secondary-2'}`}>
          <div className='progress-bar' style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  )
}

function CompleteMessage ({ percent }) {
  if (percent === 100) {
    return (
      <h4 data-flex--item='p-b--xxl full'>
        Way to go! You did it! Do your best to keep this information up to date.
      </h4>
    )
  } else {
    return (
      <h4 data-flex--item='p-b--xxl full'>
        Complete all of your profiles to get more help building your business.
      </h4>
    )
  }
}
