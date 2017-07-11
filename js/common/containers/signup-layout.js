import React from 'react'

import BasicHeader from '../components/basic-header'
import MobileBasicHeader from '../components/mobile-basic-header'
import MessageBar from '../components/message-bar'
import Footer from '../components/footer'

export default function SignupLayout (props) {
  return (
    <div className='o-default-layout' id='top'>
      <BasicHeader />

      <MobileBasicHeader />

      <MessageBar isNavbarFixed />

      <div className='o-content'>
        {React.Children.map(props.children, (child) => {
          return React.cloneElement(child, ...props)
        })}
      </div>

      <Footer />
    </div>
  )
}
