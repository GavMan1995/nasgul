import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'

import Institution from './components/institution'
import LoanRealityHeader from '../../components/loan-reality-header'
import LearnMoreLink from '../../components/learn-more-link'

class BankSelectPage extends Component {
  render () {
    const { crumb, institutions } = this.props

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title--bold'>
              Please select your bank.
            </h2>
            <div className='c-loan-reality__institution-container' >
              {institutions.map((bank, index) => {
                return <Institution key={index} bank={bank} crumb={crumb} />
              })}
            </div>
            <div className='c-loan-reality-card__form-button-container'>
              <a
                href='/loan-reality/bank-search'
                className='c-btn c-btn--l c-btn--outline'
                onClick={() => track('search_again')}>
                Search Again
              </a>
            </div>
            <div className='c-loan-reality-card__text--center'>OR</div>
            <div className='c-loan-reality-card__form-button-container'>
              <a
                href='/loan-reality/bank-list'
                className='c-btn c-btn--l c-btn--outline'
                onClick={() => track('view_all_banks')}>
                View All Banks
              </a>
            </div>
            <LearnMoreLink />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const institutionsList = this.props.institutions.map((institution) => {
      return institution.name
    })

    window.analytics.track('page_context', {
      category: 'loan_reality',
      label: 'bank_select',
      name: 'bank_select',
      properties: { institutionsList }
    })
  }
}

function track (btn) {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: `bank_select:${btn}`,
    name: `bank_select:${btn}`
  })
}

function mapStateToProps ({ crumb, institutions }) {
  return { crumb, institutions }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BankSelectPage))
module.exports.jsFilename = 'bank-select'
