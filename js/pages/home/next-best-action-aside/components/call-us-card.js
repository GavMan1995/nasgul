import React from 'react'

export default function CallUsCard () {
  return (
    <div className='c-next-best-action-aside__content-card is-active'>
      <div className='c-next-best-action-aside__content c-next-best-action-aside__content--centered-content'>
        <img
          className='c-next-best-action-aside__content-img--sm c-next-best-action-aside__content-img'
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/icon_candl_48x48.svg' />

        <strong className='c-next-best-action-aside__content-text'>
          You have low approval odds for funding
        </strong>

        <small className='c-next-best-action-aside__content-text'>
          Our credit and lending specialists can guide you through options.
        </small>
      </div>

      <a
        href='https://app.hubspot.com/meetings/nav/nav-financing-consultation-lowmf'
        target='_blank'
        className='c-btn c-btn--white c-btn--no-margin c-btn--lg'
        onClick={() => {
          window.analytics.track('feature_click', {
            category: 'internal_link',
            label: 'biz_profile_nba:schedule_call',
            name: 'biz_profile_nba:schedule_call'
          })
        }}>
        Schedule a Call
      </a>
    </div>
  )
}
