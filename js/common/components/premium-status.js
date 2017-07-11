import React from 'react'

export default function PremiumStatus ({ plan }) {
  const status = (plan.planCode !== 'freemium') ? 'active' : 'inactive'

  return (
    <a
      href='/app/alerts?ref=navbar'
      className={`c-monitoring-status-bar c-monitoring-status-bar--${status}`}
      id='Monitoring'>
      <span className='c-monitoring-status-bar__label'>
        ID Theft Protection {`${status[0].toUpperCase() + status.slice(1)}`}
      </span>
      <div className='c-monitoring-status-bar__monitoring-dot' />
    </a>
  )
}
