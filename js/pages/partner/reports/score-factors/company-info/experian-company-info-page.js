import React from 'react'

import CompanyInfoSection from './components/company-info-section'
import BureauTabs from '../../components/bureau-tabs'
import EnterpriseCard from '../../components/enterprise-card'
import EnterpriseHeader from '../../components/enterprise-header'
import ScoreFactorsTabs from '../../components/score-factors-tabs'
import SectionTabs from '../../components/section-tabs'

export default function ExperianCompanyInfoPage ({ location, report }) {
  return (
    <div className='c-enterprise'>
      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <ScoreFactorsTabs location={location} report={report} />

        <CompanyInfoSection report={report} />
      </EnterpriseCard>
    </div>
  )
}
