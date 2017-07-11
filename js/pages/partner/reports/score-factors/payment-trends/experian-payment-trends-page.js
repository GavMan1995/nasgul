import React from 'react'

import ActiveAccountsCard from '../../components/active-accounts-card'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import PaymentTrendsSection from './components/payment-trends-section'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import SectionTabs from '../../components/section-tabs'

export default function ExperianPaymentTrendsPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <PaymentTrendsSection report={report} />
      </EnterpriseCard>

      <ActiveAccountsCard report={report} />
    </div>
  )
}
