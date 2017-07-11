import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import BorrowingPowerCard from './components/borrowing-power-card'
import LenderTips from './components/lender-tips'
import LoanRealityHeader from '../components/loan-reality-header'

class BorrowingPowerPage extends Component {
  render () {
    const { borrowingPower, report, reportItems, location } = this.props
    const { accountId } = location.query
    const borrowingLimitValue = borrowingLimit(borrowingPower.attributes.value)

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />
        <div className='c-loan-reality-container'>
          <BorrowingPowerCard
            accountId={accountId}
            borrowingLimitValue={borrowingLimitValue}
            borrowingPower={borrowingPower}
            report={report} />
        </div>
        <div className='c-loan-reality-container'>
          <LenderTips reportItems={reportItems} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const { borrowingPower } = this.props
    const lenderItems = this.props.reportItems.slice(0, 3).map((item, index) => {
      return `${item.textValue} ${item.schema.name}`
    })

    window.analytics.track('page_context', {
      category: 'loan_reality',
      label: 'borrowing_power',
      name: 'borrowing_power',
      properties: {
        lenderItems,
        borrowingLimit: borrowingLimit(borrowingPower.attributes.value)
      }
    })
  }
}

function borrowingLimit (value) {
  return Math.floor(value / 100)
}

function mapStateToProps ({ borrowingPower, location, report, reportItems }) {
  return { borrowingPower, location, report, reportItems }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BorrowingPowerPage))
module.exports.jsFilename = 'borrowing-power'
