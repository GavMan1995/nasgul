import React from 'react'

export default function ScoreFactorsTabs ({ location, report }) {
  let paymentTrends = null
  let bureau
  report.type === 'experian_business_report' ? bureau = 'xpn' : bureau = 'dnb'

  if (bureau === 'xpn') {
    paymentTrends = (
      <a
        href={`/partner/reports/score-factors/payment-trends/${bureau}`}
        className={`c-enterprise__score-tab c-enterprise__score-tab--score-factors ${activeClass(location, 'payment-trends')}`}>
        Payment Trends
      </a>
    )
  }

  return (
    <div className='c-enterprise__tabs-container c-enterprise__tabs-container--blue'>
      <a
        href={`/partner/reports/score-factors/payment-status/${bureau}`}
        className={`c-enterprise__score-tab c-enterprise__score-tab--score-factors ${activeClass(location, 'payment-status')}`}>
        Payment Status
      </a>
      <a
        href={`/partner/reports/score-factors/derogatories/${bureau}`}
        className={`c-enterprise__score-tab c-enterprise__score-tab--score-factors ${activeClass(location, 'derogatories')}`}>
        Derogatories
      </a>
      <a
        href={`/partner/reports/score-factors/credit-utilization/${bureau}`}
        className={`c-enterprise__score-tab c-enterprise__score-tab--score-factors ${activeClass(location, 'credit-utilization')}`}>
        Credit Utilization
      </a>
      {paymentTrends}
      <a
        href={`/partner/reports/score-factors/company-info/${bureau}`}
        className={`c-enterprise__score-tab c-enterprise__score-tab--score-factors ${activeClass(location, 'company-info')}`}>
        Company Info
      </a>
    </div>
  )
}

function activeClass (location, section) {
  const pathBits = location.pathname.split('/')

  if (pathBits.indexOf(section) > -1) return 'is-active'

  return ''
}
