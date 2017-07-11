import React, { Component } from 'react'
import { connect } from 'react-redux'

import IdleTimeoutPage from '../components/idle-timeout-page'
import KeepAlivePage from '../components/keep-alive-page'
import TrackingPage from '../components/tracking-page'

export default function AuthWrapper (PageComponent) {
  return connect(mapStateToProps)(
    IdleTimeoutPage(KeepAlivePage(TrackingPage(class extends Component {
      render () {
        return <PageComponent {...this.props} />
      }

      componentDidMount () {
        if (this.props.me.id && this.props.me.email) {
          const { affiliateOwner, me, plan } = this.props

          window.analytics.identify(me.email, {
            name: `${me.firstName} ${me.lastName}`,
            email: me.email,
            memberId: me.id,
            affiliate: affiliateOwner.name,
            product: plan.name
          })
        }
      }
    })))
  )
}

function mapStateToProps (state) {
  const { affiliateOwner, me, plan } = state

  return { affiliateOwner, me, plan }
}
