import React from 'react'

import CreditUtilizationSection from './components/xpn/credit-utilization-section'
import ActiveAccountsCard from '../../components/active-accounts-card'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import SectionTabs from '../../components/section-tabs'
import ScoreFactorsTabs from '../../components/score-factors-tabs'

export default function ExperianCreditUtilizationPage ({ location, report }) {
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
