import React from 'react'

import ActiveAccountsCard from '../../components/active-accounts-card'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import PaymentStatusSection from './components/xpn/payment-status-section'
import SectionTabs from '../../components/section-tabs'
import ScoreFactorsTabs from '../../components/score-factors-tabs'

export default function ExperianPaymentStatusPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <PaymentStatusSection report={report} />
      </EnterpriseCard>

      <ActiveAccountsCard report={report} />
    </div>
  )
}
