import React from 'react'

export default function InitialNbaCard ({ setCurrentCard }) {
  return (
    <div className='c-next-best-action-aside__content-card c-next-best-action-aside__content-card--initial-card is-active'>
      <div className='c-next-best-action-aside__content c-next-best-action-aside__content--centered-content'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__lil-biz_108x108.svg'
          className='c-next-best-action-aside__content-img' />
        <h3 className='c-next-best-action-aside__content-text'>
          Update your info, get better financing matches
        </h3>
      </div>

      <button
        className='c-btn c-btn--primary c-btn--lg c-btn--no-margin'
        onClick={() => {
          window.analytics.track('feature_click', {
            category: 'internal_link',
            label: 'biz_profile_nba:start',
            name: 'biz_profile_nba:start'
          })

          setCurrentCard('profile_card')
        }}>
        Start
      </button>
    </div>
  )
}
