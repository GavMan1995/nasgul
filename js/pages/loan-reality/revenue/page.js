import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import CustomerSupport from '../components/customer-support'
import LoanRealityHeader from '../components/loan-reality-header'
import SectionCard from '../components/section-card'

class RevenuePage extends Component {
  render () {
    const { location, reportItems, reportSections } = this.props
    const { accountId } = location.query
    const section = reportSections.filter((section) => section.code === 'revenue')[0]
    const items = reportItems.filter((item) => section.items.includes(item.id))

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link={`/loan-reality/details-menu?accountId=${accountId}`}
          name='Back to Summary' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title'>
              {section.schema.name}
              <p className='c-loan-reality-card__page-subtitle'>
                {section.importanceText}
              </p>
            </h2>
            <p className='c-loan-reality-card__text'>
              Seeing that your business generates a healthy cash flow every month
              is the most important factor to small business lenders.
            </p>
          </div>
          <CustomerSupport />

          {items.map((item, index) => {
            return (
              <SectionCard key={index} item={item} showTeaserText />
            )
          })}
        </div>
      </div>
    )
  }

  componentDidMount () {
    const section = this.props.reportSections.filter((section) => {
      return section.code === 'revenue'
    })[0]
    const cardItem = this.props.reportItems.filter((item) => {
      return section.items.includes(item.id)
    }).map((item) => `${item.schema.name}:${item.textValue}`)

    window.analytics.track('page_context', {
      category: 'loan_reality',
      label: 'revenue',
      name: 'revenue',
      properties: { cardItem }
    })
  }
}

function mapStateToProps ({ location, reportItems, reportSections }) {
  return { location, reportItems, reportSections }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(RevenuePage))
module.exports.jsFilename = 'revenue'
