import React from 'react'

export default function Institution ({ bank }) {
  const { id, name } = bank

  return (
    <div className='c-loan-reality__institution-wrapper'>
      <a
        href={`/loan-reality/bank-credentials?institutionId=${id}&institutionName=${name}`}
        onClick={() => track(name)}>
        <div className='c-loan-reality__institution-name'>{name}</div>
        <div className='c-loan-reality__arrow-right-container' >
          <div className='c-loan-reality__arrow-right'>
            <span />
          </div>
        </div>
      </a>
    </div>
  )
}

function track (name) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `bank_select:${name}`,
    name: `bank_select:${name}`
  })
}
