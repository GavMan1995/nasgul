import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'
import LoaderCard from '../../../common/components/loader-card'

import EnrollmentService from '../common/enrollment-service'

import LoanRealityHeader from '../components/loan-reality-header'
import TipBox from '../components/tip-box'

class AnalyzingPage extends Component {
  constructor (props) {
    super(props)
    this.state = { tipIndex: 0 }
  }

  render () {
    const { enrollmentTips } = this.props
    const tip = enrollmentTips[this.state.tipIndex]

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />

        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <LoaderCard
              loaderClass='c-loan-reality-card__loader-wrapper'
              text='Analyzing...' />
            <p className='c-loan-reality-card__subtitle'>
              We are analyzing your business checking account.
            </p>
            <p className='c-loan-reality-card__text'>
              In a moment, we will show you how small business lenders will view
              you based on your cash flow.
            </p>
            <div className='c-loan-reality-card__tips-wrapper'>
              <TipBox tip={tip} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const { accountId } = this.props.location.query
    const { enrollmentTips } = this.props

    window.fetch(`/client/lrc/api/reports?account_id=${accountId}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        window.location.href = `/loan-reality/borrowing-power?accountId=${accountId}`

        return
      }

      window.location.href = EnrollmentService.errorUrl()
    })

    const intervalId = setInterval(() => {
      let count = this.state.tipIndex++

      if (count < (enrollmentTips.length * 4)) {
        if (count > (enrollmentTips.length - 1)) count = 0

        this.setState({ tipIndex: count })
      } else {
        window.location.href = '/loan-reality/connection-timeout'
      }
    }, 6000)

    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  updateTipCount (newIndex) {
    this.setState({ tipIndex: newIndex })
  }
}

function mapStateToProps ({ enrollmentTips, location }) {
  return { enrollmentTips, location }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(AnalyzingPage))
module.exports.jsFilename = 'analyzing'
