import React from 'react'

import CreditUtilizationSection from './components/dnb/credit-utilization-section'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import SectionTabs from '../../components/section-tabs'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import ActiveAccountsCard from '../../components/dnb/active-accounts-card'

export default function DnbCreditUtilizationPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <CreditUtilizationSection report={report} />
      </EnterpriseCard>

      <ActiveAccountsCard report={report} />
    </div>
  )
}
