import React, { Component } from 'react'
import { connect } from 'react-redux'

import BasicHeader from '../components/basic-header'
import Footer from '../components/footer'
import IdleTimeoutPage from '../components/idle-timeout-page'
import KeepAlivePage from '../components/keep-alive-page'
import MessageBar from '../components/message-bar'
import MobileBasicHeader from '../components/mobile-basic-header'
import TrackingPage from '../components/tracking-page'

export default function SignupPage (PageComponent, options = {}) {
  return connect(mapStateToProps)(
    IdleTimeoutPage(KeepAlivePage(TrackingPage(class extends Component {
      render () {
        return (
          <div className='o-default-layout' id='top'>
            <BasicHeader />

            <MobileBasicHeader />

            <MessageBar isNavbarFixed={options.isNavbarFixed || false} />

            <div className='o-content'>
              <PageComponent {...this.props} />
            </div>

            <Footer />
          </div>
        )
      }

      componentDidMount () {
        if (this.props.me.id && this.props.me.email) {
          const { affiliateOwner, me, plan } = this.props

          window.analytics.identify(me.email, {
            affiliate: affiliateOwner.name,
            email: me.email,
            letterGrade: me.letterGrade,
            memberId: me.id,
            name: `${me.firstName} ${me.lastName}`,
            product: plan.name
          })
        }
      }
    })))
  )
}

function mapStateToProps ({ affiliateOwner, me, plan }) {
  return { affiliateOwner, me, plan }
}
