import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../../common/containers/auth-page'
import LoaderCard from '../../../../common/components/loader-card'

import LoanRealityHeader from '../../components/loan-reality-header'
import parseEnrollmentsResults from '../../common/parsers/parse-enrollments-results'
import EnrollmentService from '../../common/enrollment-service'
import TipBox from '../../components/tip-box'

class ConnectingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tipIndex: 0,
      tipCount: 0,
      nextPageReady: false
    }
  }

  render () {
    const { enrollment, enrollmentTips } = this.props
    const tip = enrollmentTips[this.state.tipIndex]

    return (
      <div className='o-site-container'>
        <LoanRealityHeader
          link='/loan-reality/bank-search'
          name='Search Banks' />

        <div className='c-loan-reality-container'>
          <div className='c-card c-loan-reality-card'>
            <h2 className='c-loan-reality-card__title'>
              {enrollment.institutionName}

              <p className='c-loan-reality-card__subtitle'>
                We're connecting to your bank account. This may take a bit.
              </p>
            </h2>
            <LoaderCard
              loaderClass='c-loan-reality-card__loader-wrapper'
              text='Hang in there...' />
            <div className='c-loan-reality-card__tips-wrapper'>
              <TipBox tip={tip} />
            </div>

          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const intervalId = setInterval(() => {
      const newIndex = this.state.tipIndex + 1
      const { enrollmentTips } = this.props
      const { tipCount } = this.state

      if (tipCount < (enrollmentTips.length * 4)) {
        window.fetch(`/client/lrc/api/enrollments/${this.props.enrollment.id}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include'
        }).then((response) => {
          return response.json()
        }).then((data) => {
          const body = parseEnrollmentsResults(JSON.stringify(data))
          const enrollment = body.enrollments.filter((item) => {
            return item.institutionId === this.props.enrollment.institutionId
          })[0]

          window.analytics.track('page_context', {
            category: 'connecting',
            label: 'enrollment',
            name: 'enrollment',
            properties: {
              institution_id: enrollment.institutionId,
              institution_name: enrollment.institutionName,
              status: enrollment.status
            }
          })

          if (enrollment.status !== 'REQUESTED' && newIndex > 0) {
            this.setState({ nextPageReady: true })

            clearInterval(this.state.intervalId)

            const url = EnrollmentService.redirectUrl(enrollment)
            window.location = url
          }

          this.updateTipCount(newIndex, this.state.tipCount + 1)
        }).catch((error) => window.Bugsnag && window.Bugsnag.notifyException(error))
      } else {
        window.location.href = '/loan-reality/connection-timeout'
      }
    }, 6000)

    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  updateTipCount (newIndex, newCount) {
    this.setState({
      tipIndex: newIndex,
      tipCount: newCount
    })
  }
}

function mapStateToProps ({ enrollment, enrollmentTips }) {
  return { enrollment, enrollmentTips }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(ConnectingPage))
module.exports.jsFilename = 'connecting'
