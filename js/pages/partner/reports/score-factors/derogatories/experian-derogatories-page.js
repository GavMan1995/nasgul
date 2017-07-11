import React from 'react'

import DerogatoriesSection from './components/derogatories-section'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import SectionTabs from '../../components/section-tabs'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import TaxLiensCard from '../../components/tax-liens-card'

export default function ExperianDerogatoriesPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <DerogatoriesSection report={report} />
      </EnterpriseCard>

      <TaxLiensCard report={report} />
    </div>
  )
}
