import React from 'react'

export default function BusinessScoresMessage ({ activeBusiness, businessScores }) {
  if (businessScores.length > 0) return null

  if (!activeBusiness.name) {
    return (
      <div className='c-dashboard__no-score'>
        <h3>You have not added a business.</h3>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/nav-ghost.svg' />
        <p>Let's see if we have your business on file.</p>
        <a href='/app/add_business' className='c-btn c-btn--primary'>
          Search for Your Business
        </a>
      </div>
    )
  } else {
    return (
      <div className='c-dashboard__no-score'>
        <h3>Reports have not been pulled for this business yet.</h3>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/nav-stopwatch.svg' />
        <p>They'll show up here when they are available.</p>
        <a
          href='/app/build/business_launcher'
          className='c-btn c-btn--primary'>
          Get Started With BusinessLauncher
        </a>
      </div>
    )
  }
}
