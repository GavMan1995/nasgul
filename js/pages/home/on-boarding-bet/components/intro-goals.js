import React from 'react'

// TODO: Make the image containers into one container, containing two images
export default function IntroGoals ({ me, setIntent, isDismissed, onClick }) {
  return (
    <div className={`c-onboarding-panel ${isDismissed ? 'is-dismissed' : ''}`}>
      <div className='c-onboarding-panel__header'>
        <h3>Hello {me.firstName},</h3>
        <h1>Welcome to nav</h1>
      </div>

      <div className='c-onboarding-panel__content'>
        <p className='c-onboarding-panel__description '>
          Nav provides easy, proven ways to improve your business credit and get the funding you need. <br />
          Get started with the following:
        </p>

        <div
          className='c-onboarding-task'
          onClick={() => {
            trackSelectedIntent('Establish My Business Credit Profile ')

            setIntent('establish_business_credit')
          }}>
          <div className='c-onboarding-task__info'>
            <div className='c-onboarding-task__img-container'>
              <img className='c-onboarding-task__img' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__lil-biz_108x108.svg' />
              <img className='c-onboarding-task__img c-onboarding-task__img--small' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__lil-biz_54x54.svg' />
            </div>
            <div className='c-onboarding-task__info-text'>
              <p>Establish My Business Credit Profile</p>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
          </div>
          <div className='c-onboarding-task__btn-container'>
            <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
              Learn More
            </a>
          </div>
        </div>
        <div
          className='c-onboarding-task'
          onClick={() => {
            trackSelectedIntent('Improve My Business Credit Scores')

            setIntent('improve_business_credit')
          }}>
          <div className='c-onboarding-task__info'>
            <div className='c-onboarding-task__img-container'>
              <img className='c-onboarding-task__img' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__report-grade_108x108.svg' />
              <img className='c-onboarding-task__img c-onboarding-task__img--small' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__report-grade_54x54.svg' />
            </div>
            <div className='c-onboarding-task__info-text'>
              <p>Improve My Business Credit Scores</p>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
          </div>
          <div className='c-onboarding-task__btn-container'>
            <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
              Get Started
            </a>
          </div>
        </div>
        <div
          className='c-onboarding-task'
          onClick={() => {
            trackSelectedIntent('Get a Business Credit Card')

            setIntent('get_business_credit_card')
          }}>
          <div className='c-onboarding-task__info'>
            <div className='c-onboarding-task__img-container'>
              <img className='c-onboarding-task__img' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__credit-card_108x108.svg' />
              <img className='c-onboarding-task__img c-onboarding-task__img--small' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__credit-card_54x54.svg' />
            </div>
            <div className='c-onboarding-task__info-text'>
              <p>Get a Business Credit Card</p>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
          </div>
          <div className='c-onboarding-task__btn-container'>
            <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
              Apply Now
            </a>
          </div>
        </div>
        <div
          className='c-onboarding-task'
          onClick={() => {
            trackSelectedIntent('Get Business Financing')

            setIntent('get_business_financing')
          }}>
          <div className='c-onboarding-task__info'>
            <div className='c-onboarding-task__img-container'>
              <img className='c-onboarding-task__img' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__cash-money_108x108.svg' />
              <img className='c-onboarding-task__img c-onboarding-task__img--small' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__cash-money_54x54.svg' />
            </div>
            <div className='c-onboarding-task__info-text'>
              <p>Get Business Financing</p>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
          </div>
          <div className='c-onboarding-task__btn-container'>
            <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
              Get Started
            </a>
          </div>
        </div>
        <div
          className='c-onboarding-task'
          onClick={() => {
            trackSelectedIntent('Control My Personal Credit')

            setIntent('control_personal_credit')
          }}>
          <div className='c-onboarding-task__info'>
            <div className='c-onboarding-task__img-container'>
              <img className='c-onboarding-task__img' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__cs-team_108x108.svg' />
              <img className='c-onboarding-task__img c-onboarding-task__img--small' src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/onboarding-icons/icon__cs-team_54x54.svg' />
            </div>
            <div className='c-onboarding-task__info-text'>
              <p>Control My Personal Credit</p>
            </div>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
          </div>
          <div className='c-onboarding-task__btn-container'>
            <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className='c-onboarding-panel__dismiss-btn'>
        <p className='u-large-copy' onClick={onClick}>
          Don't show me this
        </p>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
      </div>
    </div>
  )
}

function trackSelectedIntent (label) {
  window.analytics.track('Feature Click', {
    category: 'Internal Link',
    label: `On Boarding: ${label}`,
    name: `On Boarding: ${label}`
  })
}
