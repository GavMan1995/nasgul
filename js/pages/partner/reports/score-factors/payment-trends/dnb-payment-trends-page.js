import React from 'react'

import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import PaymentTrendsSection from './components/payment-trends-section'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import SectionTabs from '../../components/section-tabs'

import ActiveAccountsCard from '../../components/dnb/active-accounts-card'

export default function DanbPaymentTrendsPage ({ location, report }) {
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
