import React from 'react'

import BureauTabs from '../components/bureau-tabs'
import EnterpriseCard from '../components/enterprise-card'
import EnterpriseHeader from '../components/enterprise-header'
import SectionTabs from '../components/section-tabs'
import ScoreDisplay from '../components/score-display'
import ScoreSectionWhatScoreMeans from '../components/score-section-what-score-means'
import StatsCard from '../components/stats-card'

export default function ExperianScorePage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <div className='c-enterprise-score'>
          <ScoreDisplay report={report} />

          <ScoreSectionWhatScoreMeans report={report} />
        </div>
      </EnterpriseCard>

      <StatsCard report={report} />
    </div>
  )
}
