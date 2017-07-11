import React from 'react'

export default function GoalActions (props) {
  const { currentHeader, purpose, unsetIntent, isDismissed, onClick } = props

  return (
    <div className={`c-onboarding-panel ${isDismissed ? 'is-dismissed' : ''}`}>
      <div className='c-onboarding-panel__header'>
        <a onClick={() => {
          window.analytics.track('Feature Click', {
            category: 'Internal Link',
            label: 'On Boarding: Back to All Intro Goals',
            name: 'On Boarding: Back to All Intro Goals'
          })

          unsetIntent()
        }}>
          &lt; Back
        </a>
        <h1>You’re working on: {purpose.headline}</h1>
      </div>

      <div className='c-onboarding-panel__content'>
        <p className='c-onboarding-panel__description'>
          {purpose.subhead}
        </p>

        {purpose.actions.map((action, index) => {
          return (
            <div
              key={index}
              className='c-onboarding-task'
              onClick={() => {
                trackTask(currentHeader, action.title)

                window.location.href = action.buttonLink
              }}>
              <div className='c-onboarding-task__info'>
                <div className='c-onboarding-task__img-container'>
                  <img
                    className='c-onboarding-task__img'
                    src={action.iconLinkLarge} />
                  <img
                    className='c-onboarding-task__img c-onboarding-task__img--small'
                    src={action.iconLinkSmall} />
                </div>
                <div className='c-onboarding-task__info-text'>
                  <p><strong>{action.title}</strong></p>
                  <p>{action.statement}</p>
                </div>
                <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/MF_Icon_Arrowdown.svg' />
              </div>
              <div className='c-onboarding-task__btn-container'>
                <a className='c-btn c-btn--sm c-btn--primary c-btn--outline'>
                  {action.buttonLabel}
                </a>
              </div>
            </div>
          )
        })}
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

function trackTask (header, label) {
  window.analytics.track('Feature Click', {
    category: 'Internal Link',
    label: `On Boarding: ${header}: ${label}`,
    name: `On Boarding: ${header}: ${label}`
  })
}
