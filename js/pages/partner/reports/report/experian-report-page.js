import React from 'react'
import {connect} from 'react-redux'

import ActiveTradeAccounts from '../components/active-trade-accounts-card'
import BureauTabs from '../components/bureau-tabs'
import BusinessInformationCard from '../components/business-information-card'
import BrandingImage from '../components/branding-image'
import CDNLogo from '../../../../common/components/cdn-logo'
import EnterpriseCard from '../components/enterprise-card'
import EnterpriseHeader from '../components/enterprise-header'
import InfluencingFactorsCard from '../components/influencing-factors-card'
import ReportSummaryCard from '../components/report-summary-card'
import ScoreDisplay from '../components/score-display'
import ScoreSectionScoreFactors from '../components/score-section-score-factors'
import SectionTabs from '../components/section-tabs'
import TaxLiensCard from '../components/tax-liens-card'
import TradeAccountPaymentCard from '../components/trade-account-payment-card'
import UccFilingsCard from '../components/ucc-filings-card'
import scoreModelForReportType from '../utils/score-model-for-report-type'
import safeStringToNumber from '../utils/safe-string-to-number'

function ExperianReportPage ({ location, report, business }) {
  const score = scoreModelForReportType(report.attributes.scores, report.type)
  const scoreValue = safeStringToNumber(score.value)

  return (
    <div className='c-enterprise'>
      <div className='c-enterprise-pdf-header'>
        <div className='c-enterprise-pdf-header__score-container'>
          <CDNLogo filename='experian.svg' />
          <p>Intelliscore Plus&#8480; V2</p>
          <h1><strong>{scoreValue}</strong>/100</h1>
          <p>
            Quite simply, the Intelliscore Plus&#8480; V2 credit score is a statistically
            based credit-risk evaluation. The main purpose of Intelliscore Plus
            is to help businesses, investors and potential lenders make well
            educated decisions about who they should or should not do business with.
          </p>
        </div>
      </div>

      <EnterpriseHeader />

      <EnterpriseCard>
        <BureauTabs report={report} />

        <SectionTabs location={location} report={report} />

        <div className='c-enterprise-score'>
          <ScoreDisplay report={report} />

          <ScoreSectionScoreFactors report={report} />

          <a
            href='/partner/reports/download/xpn'
            className='c-btn c-btn--primary c-btn--xl'>
            Download Report
          </a>
        </div>
      </EnterpriseCard>

      <BusinessInformationCard report={report} />

      <InfluencingFactorsCard report={report} />

      <ReportSummaryCard report={report} />

      <TaxLiensCard report={report} />

      <TradeAccountPaymentCard report={report} />

      <UccFilingsCard report={report} />

      <ActiveTradeAccounts report={report} />

      <div className='c-enterprise-pdf-footer'>
        <p>Report provided by</p>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/logo-name-blue.svg' />
      </div>
    </div>
  )
}

function mapStateToProps ({ business }) {
  return { business }
}

export default connect(mapStateToProps)(ExperianReportPage)
