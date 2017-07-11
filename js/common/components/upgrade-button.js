import React from 'react'

export default function UpgradeButton ({ plan = {} }) {
  if (plan.planCode !== 'freemium') return null

  return (
    <div className='c-navbar__upgrade'>
      <a href='/app/upgrade?ref=navbar' className='c-btn c-btn--md'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-white.svg'
          width='20'
          height='18' />
        Upgrade
      </a>
    </div>
  )
}
