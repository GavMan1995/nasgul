import React from 'react'

import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import SectionTabs from '../../components/section-tabs'
import ScoreDisplay from '../../components/score-display'
import ScoreFactorsSection from './components/score-factors-section'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import ScoreSectionInsight from '../../components/score-section-insight'

export default function ExperianIndexPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <div className='c-enterprise-score'>
          <ScoreDisplay report={report} />

          <ScoreSectionInsight />
        </div>
      </EnterpriseCard>

      <ScoreFactorsSection report={report} />
    </div>
  )
}
