import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthWrapper from '../../../common/containers/auth-wrapper'

import AuthLayout from '../../../common/containers/auth-layout'
import SignupLayout from '../../../common/containers/signup-layout'

import CDNAsset from '../../../common/components/cdn-asset'
import CDNLogo from '../../../common/components/cdn-logo'
import PageWrapper from '../components/page-wrapper'
import SelectSimilar from './components/select-similar'
import ErrorView from './components/error-view'
import VerifyBestSimilar from './components/verify-best-similar'

class SimilarsPage extends Component {
  constructor (props) {
    super(props)

    const { bureau, id, isOwned, name, zip } = this.props.location.query

    this.state = {
      businessInfo: {
        bureau,
        id,
        isOwned,
        name,
        zip
      },
      showSimilars: false
    }
  }

  render () {
    const { businessInfo, showSimilars } = this.state
    const { similars, signupPlan } = this.props

    let bureauLogo, bureauName
    if (businessInfo.bureau === 'experian') {
      bureauName = 'Experian'
      bureauLogo = <CDNLogo height='32' filename='experian.svg' />
    }
    if (businessInfo.bureau === 'dandb') {
      bureauName = 'Dun & Bradstreet'
      bureauLogo = (
        <CDNAsset
          height='32'
          directory='images'
          filename='dandb-logo.png' />
      )
    }

    let headerText = `Let's link to your ${bureauName} Business Report`
    let view = (
      <VerifyBestSimilar
        businessInfo={businessInfo}
        bureauLogo={bureauLogo}
        bureauName={bureauName}
        viewSimilars={this.viewSimilars.bind(this)} />
    )

    if (showSimilars) {
      view = <SelectSimilar
        businessInfo={businessInfo}
        bureauLogo={bureauLogo}
        bureauName={bureauName} />
    }

    if (Object.keys(similars).length === 0) {
      headerText = 'Whoops!'
      view = <ErrorView bureauLogo={bureauLogo} />
    }

    let Layout = AuthLayout

    if (signupPlan && signupPlan !== 'freemium') Layout = SignupLayout

    return (
      <Layout>
        <PageWrapper headerText={headerText}>
          {view}
        </PageWrapper>
      </Layout>
    )
  }

  viewSimilars () {
    window.analytics.track('Wrong Business', {
      name: this.props.location.query.bureau,
      label: this.props.location.query.bureau,
      category: 'Add Business Interaction'
    })
    this.setState({showSimilars: true})
  }
}

function mapStateToProps ({ crumb, location, similars, signupPlan }) {
  return { crumb, location, similars, signupPlan }
}

module.exports = exports.default = connect(mapStateToProps)(AuthWrapper(SimilarsPage))
module.exports.jsFilename = 'similars'
