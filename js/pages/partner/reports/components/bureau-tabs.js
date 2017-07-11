import React from 'react'
import CDNIcon from '../../../../common/components/cdn-icon'

export default function BureauTabs ({ report = {} }) {
  return (
    <div className='c-enterprise__tabs-container'>
      <div className={`c-enterprise__bereau-tab ${activeClass(report, 'experian')}`}>
        <a
          href='/partner/reports/score/xpn'
          className='c-enterprise__bereau-tab-copy'>
          <h3>Experian</h3>
          <small>Intelliscore</small>
        </a>

        <a
          href='/partner/reports/download/xpn'
          className='c-enterprise__download-icon'>
          <CDNIcon filename='download-report-blue.svg' />
        </a>
      </div>

      <div
        className={`c-enterprise__bereau-tab ${activeClass(report, 'dun_and_bradstreet')}`}>
        <a
          href='/partner/reports/score/dnb'
          className='c-enterprise__bereau-tab-copy'>
          <h3>Dun &amp; Bradstreet</h3>
          <small>Paydex</small>
        </a>

        <a
          href='/partner/reports/download/dnb'
          className='c-enterprise__download-icon'>
          <CDNIcon filename='download-report-blue.svg' />
        </a>
      </div>
    </div>
  )
}

function activeClass (report, bureau) {
  if (report.type && report.type.indexOf(bureau) > -1) return 'is-open'

  return ''
}
