import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

const iconLookup = {
  revenue: 'icon-revenue.svg',
  cash_management: 'icon-cash.svg',
  customer_mix: 'icon-customers.svg',
  debt_management: 'icon-debt.svg'
}

export default function MenuItem ({ accountId, section }) {
  let slug = section.code.replace('_', '-')

  if (slug === 'customer-mix') slug = 'customer-count'

  return (
    <a
      href={`/loan-reality/${slug}?accountId=${accountId}`}
      className='c-card c-loan-reality-card__menu'
      onClick={() => track(section.code)}>
      <CDNAsset
        className='c-loan-reality-card__small-menu-image'
        directory='images/loan-reality'
        filename={iconLookup[section.code]} />
      <div className='c-loan-reality-card__menu-card-title'>
        <h4>
          {section.schema.name}
        </h4>
        <p>
          {section.importanceText}
        </p>
      </div>
      <div className='c-loan-reality-card__menu-gauge-image-wrapper'>
        <CDNAsset
          className='c-loan-reality-card__small-menu-gauge-image'
          directory='images/loan-reality'
          filename={section.gaugeImage} />
        <div className={section.gaugeTextClass}>{section.gaugeText}</div>
      </div>
    </a>
  )
}

function track (name) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `details_menu:${name}`,
    name: `details_menu:${name}`
  })
}
