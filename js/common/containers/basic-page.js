import React, { Component } from 'react'

import BasicHeader from '../components/basic-header'
import Footer from '../components/footer'
import MessageBar from '../components/message-bar'
import MobileBasicHeader from '../components/mobile-basic-header'

export default function BasicPage (PageComponent, options = {}) {
  return class extends Component {
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
  }
}
