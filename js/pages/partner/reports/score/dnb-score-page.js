import React from 'react'

import BureauTabs from '../components/bureau-tabs'
import EnterpriseCard from '../components/enterprise-card'
import EnterpriseHeader from '../components/enterprise-header'
import SectionTabs from '../components/section-tabs'
import ScoreDisplay from '../components/score-display'
import WhatScoreMeans from '../components/dnb/what-score-means'

export default function DnbScorePage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <div className='c-enterprise-score'>
          <ScoreDisplay report={report} />

          <WhatScoreMeans report={report} />
        </div>
      </EnterpriseCard>
    </div>
  )
}
