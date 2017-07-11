import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'

import LoanRealityHeader from '../../components/loan-reality-header'
import LearnMoreLink from '../../components/learn-more-link'

import SearchForm from './components/search-form'
import SearchTitle from './components/search-title'
import SearchBody from './components/search-body'
import SearchImage from './components/search-image'

class BankSearchPage extends Component {
  render () {
    const { crumb, location } = this.props
    const { noInstitutionsFound } = location.query

    return (
      <div className='o-site-container'>
        <LoanRealityHeader link='/loan-reality/agreement' name='Agree' />
        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <SearchTitle noInstitutionsFound={noInstitutionsFound} />
            <SearchBody noInstitutionsFound={noInstitutionsFound} />
            <SearchImage noInstitutionsFound={noInstitutionsFound} />
            <SearchForm crumb={crumb} />
            <LearnMoreLink />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ crumb, location }) {
  return { crumb, location }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(BankSearchPage))
module.exports.jsFilename = 'bank-search'
