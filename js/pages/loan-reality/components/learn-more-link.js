import React from 'react'

export default function LearnMoreLink () {
  return (
    <div className='c-loan-reality-card__learn-more'>
      <a
        href='/loan-reality/learn-more'
        onClick={trackLearnMore}>
        Learn more about how we secure your information.
      </a>
    </div>
  )
}

function trackLearnMore () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'secure_learn_more',
    name: 'secure_learn_more'
  })
}
