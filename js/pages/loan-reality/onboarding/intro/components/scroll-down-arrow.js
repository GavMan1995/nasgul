import React from 'react'

export default function ScrollDownArrow ({ destination }) {
  return (
    <a
      href={`#${destination}`}
      className='c-loan-reality-card__down-arrow-container'
      onClick={() => track(destination)}>
      <div className='c-loan-reality-card__down-arrow'>
        <span />
      </div>
    </a>
  )
}

function track (destination) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `scroll_down:${destination}`,
    name: `scroll_down:${destination}`
  })
}
