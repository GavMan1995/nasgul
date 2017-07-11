import React from 'react'

export default function SectionTabs ({ report, location }) {
  let bureau
  report.type === 'experian_business_report' ? bureau = 'xpn' : bureau = 'dnb'

  return (
    <div className='c-enterprise__tabs-container c-enterprise__tabs-container--score-tabs'>
      <a
        href={`/partner/reports/score/${bureau}`}
        className={`c-enterprise__score-tab ${activeClass(location, 'score')}`}>
        Score
      </a>

      <a
        href={`/partner/reports/report/${bureau}`}
        className={`c-enterprise__score-tab ${activeClass(location, 'report')}`}>
        Report
      </a>

      <a
        href={`/partner/reports/score-factors/${bureau}`}
        className={`c-enterprise__score-tab ${activeClass(location, 'score-factors')}`}>
        Score Factors
      </a>
    </div>
  )
}

function activeClass (location, section) {
  const pathBits = location.pathname.split('/')

  if (pathBits.indexOf(section) > -1) return 'is-active'

  return ''
}
