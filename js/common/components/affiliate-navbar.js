import React, { Component } from 'react'

export default class AffiliateNavbar extends Component {
  render () {
    const { isNavbarFixed, location } = this.props
    const fixedClass = isNavbarFixed ? 'c-navbar__bottom--fixed' : ''

    return (
      <div className={`c-navbar__bottom ${fixedClass}`}>
        <div className='c-navbar__site-container'>
          <div className='c-navbar__logo-bug'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/images/logo-cyan.svg' />
            <div className='c-navbar__logo-mask' />
          </div>

          <div className={menuClass(location, 'home')}>
            <div className='c-dropdown-menu__title'>
              <a href='/dashboard?ref=navbar'>
                HOME
              </a>
            </div>
          </div>

          <div className={menuClass(location, 'build')}>
            <div className='c-dropdown-menu__title'>
              <a href='/app/build?ref=navbar'>
                TOOLS
              </a>
            </div>

            <div className='c-dropdown-menu__dropdown'>
              <a
                href='/app/build/business_launcher?ref=navbar'
                className='c-dropdown-menu__option'>
                <p>BusinessLauncher</p>
              </a>

              <a
                href='/app/build/credit_sweeper?ref=navbar'
                className='c-dropdown-menu__option'>
                <p>Disputes</p>
              </a>

              <a
                href='/app/build/credit_target?ref=navbar'
                className='c-dropdown-menu__option'>
                <p>Goals</p>
              </a>
            </div>
          </div>

          <div className={menuClass(location, 'app/analyze')}>
            <div className='c-dropdown-menu__title'>
              <a href='/app/analyze/scoreboard?ref=navbar'>
                REPORTS
              </a>
            </div>

            <div className='c-dropdown-menu__dropdown'>
              <a
                href='/app/analyze/scoreboard?ref=navbar'
                className='c-dropdown-menu__option'>
                <p>Scoreboard</p>
              </a>

              <a
                href='/app/analyze/history?ref=navbar'
                className='c-dropdown-menu__option'>
                <p>Report History</p>
              </a>
            </div>
          </div>

          <div className={menuClass(location, 'alerts')}>
            <div className='c-dropdown-menu__title'>
              <a href='/alerts?ref=navbar'>
                ALERTS
              </a>
            </div>
          </div>

          <div className={menuClass(location, 'market')}>
            <div className='c-dropdown-menu__title'>
              <a href='/market/business-services?ref=navbar' target='_self'>
                BUSINESS SERVICES
              </a>
            </div>
          </div>

          <div className='c-dropdown-menu c-dropdown-menu--alt'>
            <div className='c-dropdown-menu__title'>
              <a href='https://www.nav.com/blog/?ref=navbar' target='_blank'>
                BLOG
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function menuClass (location, uri) {
  let result = 'c-dropdown-menu c-dropdown-menu--alt'

  if (new RegExp(`^/${uri}`).test(location.pathname)) {
    result += ' is-active'
  }

  return result
}
