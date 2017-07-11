import React from 'react'

export default function ScoreFactorLink ({ children, report, target, className }) {
  let bureau
  report.type === 'experian_business_report' ? bureau = 'xpn' : bureau = 'dnb'

  return (
    <a
      className={className}
      href={`/partner/reports/score-factors/${target}/${bureau}`}>
      {children}
    </a>
  )
}
