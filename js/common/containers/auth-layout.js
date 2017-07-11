import React, { Component } from 'react'
import { connect } from 'react-redux'

import inView from 'in-view'

import AuthHeader from '../components/auth-header'
// NOTE: This is gross stuff for an affiliate. Hopefully it's temporary.
import AffiliateMobileNav from '../components/affiliate-mobile-nav'
import BottomBar from '../components/bottom-bar'
import Footer from '../components/footer'
import MessageBar from '../components/message-bar'
import MobileAuthHeader from '../components/mobile-auth-header'

class AuthLayout extends Component {
  constructor (props) {
    super(props)

    this.state = { margin: '0px' }
  }

  render () {
    const {
      affiliateOwner,
      isMobileMenuShown,
      isNavbarFixed,
      location,
      toggleMobileMenu
    } = this.props
    const { margin } = this.state

    let mobileNav = (
      <MobileAuthHeader
        isMobileMenuShown={isMobileMenuShown}
        pathname={location.pathname}
        toggle={toggleMobileMenu} />
    )

    // NOTE: This is for Flexmark affiliate as per Joel
    if (affiliateOwner.id === 6331 || affiliateOwner.id === 2748) {
      mobileNav = (
        <AffiliateMobileNav
          isMobileMenuShown={isMobileMenuShown}
          pathname={location.pathname}
          toggle={toggleMobileMenu} />
      )
    }

    return (
      <div className='o-default-layout' id='top'>
        <AuthHeader isNavbarFixed={isNavbarFixed} />

        {mobileNav}

        <MessageBar isNavbarFixed={isNavbarFixed} />

        <div className='o-content' style={{ marginTop: margin }}>
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, ...this.props)
          })}
        </div>

        <Footer />

        <BottomBar isNavbarFixed={isNavbarFixed} />
      </div>
    )
  }

  componentDidMount () {
    inView('.js-navbar-top')
      .on('enter', () => {
        this.props.toggleNavbar(false)

        this.setState({ margin: '0px' })
      })
      .on('exit', () => {
        this.props.toggleNavbar(true)

        const messageBar = document.querySelector('.c-alert-bar')

        this.setState({ margin: `${messageBar.style.maxHeight || 0}px` })
      })

    const element = document.querySelector('.js-navbar-top')

    if (!inView.is(element)) inView('.js-navbar-top').emit('exit', element)

    if (this.props.isMobileMenuShown) {
      document.body.classList.add('is-scroll-locked')
    } else {
      document.body.classList.remove('is-scroll-locked')
    }
  }

  componentDidUpdate () {
    if (this.props.isMobileMenuShown) {
      document.body.classList.add('is-scroll-locked')
    } else {
      document.body.classList.remove('is-scroll-locked')
    }
  }

  toggleMobileMenu () {
    this.setState({ isMobileMenuShown: !this.state.isMobileMenuShown })
  }
}

function mapStateToProps (state) {
  const { affiliateOwner, isMobileMenuShown, isNavbarFixed, location } = state

  return { affiliateOwner, isMobileMenuShown, isNavbarFixed, location }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleMobileMenu (isShown) {
      dispatch({ type: 'TOGGLE_MOBILE_MENU', isShown })
    },
    toggleNavbar (isFixed) {
      dispatch({ type: 'TOGGLE_NAVBAR', isFixed })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout)
