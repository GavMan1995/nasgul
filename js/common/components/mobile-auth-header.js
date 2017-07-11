import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import BrandLink from './brand-link'
import CDNIcon from './cdn-icon'

import UpgradeButton from './upgrade-button'

export default class MobileAuthHeader extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isReportsGroupOpen: false,
      reportsGroupHeight: 0,
      isToolsGroupOpen: false,
      toolsGroupHeight: 0
    }
  }

  render () {
    const { plan, isMobileMenuShown, pathname, toggle } = this.props
    const {
      isReportsGroupOpen,
      reportsGroupHeight,
      isToolsGroupOpen,
      toolsGroupHeight
    } = this.state

    return (
      <div className={`c-mobile-navbar ${isMobileMenuShown ? 'c-mobile-navbar--open' : ''}`}>
        <div className='c-mobile-navbar__bar'>
          <BrandLink />
          <UpgradeButton plan={plan} />

          <div className='c-menu-hamburger' onClick={() => {
            toggle(!isMobileMenuShown)
          }}>
            <div className='c-menu-hamburger__container'>
              <div className='c-menu-hamburger__lines'>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className='c-mobile-navbar__menu-container'>
          <div className='c-mobile-navbar__menu'>
            <a
              href='/dashboard?ref=navbar'
              className={`c-mobile-navbar__menu-item ${isActive('/home', pathname)}`}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/home_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/home_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Home
            </a>

            <a
              href='/market/lending-offers?ref=navbar'
              target='_self'
              className={`c-mobile-navbar__menu-item ${isActive('/financing-options', pathname)}`}>

              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/loans_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/loans_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Business Loans
            </a>

            <a
              href='/market/credit-cards?ref=navbar'
              target='_self'
              className={`c-mobile-navbar__menu-item ${isActive('/market/credit-cards', pathname)}`}>

              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/credit-cards_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/credit-cards_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Credit Cards
            </a>

            <a
              href='/business-services?ref=navbar'
              target='_self'
              className={`c-mobile-navbar__menu-item ${isActive('/business-services', pathname)}`}>

              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/business-services_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/business-services_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Business Services
            </a>

            <div
              className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--group-header ${isReportsGroupOpen ? 'is-open' : ''}`}
              onClick={this.toggleReportsGroup.bind(this)}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/reports_26x26.svg'
                  className='c-mobile-navbar__icon' />
              </span>
              Reports
              <CDNIcon filename='chevron_20x10.svg' />
            </div>

            <div
              className='c-mobile-navbar__menu-group js-reports-group'
              style={{maxHeight: `${isReportsGroupOpen ? reportsGroupHeight : 0}px`}}>
              <a
                href='/app/analyze/scoreboard?ref=navbar'
                className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--sub-item ${isActive('/app/analyze/scoreboard', pathname)}`}>
                <span className='c-mobile-navbar__icon-container'>
                  <CDNIcon
                    filename='menu/scoreboard_26x26.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                  <CDNIcon
                    filename='menu/scoreboard_26x26_active.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
                </span>
                Scoreboard
              </a>

              <a
                href='/app/analyze/history?ref=navbar'
                className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--sub-item ${isActive('/app/analyze/history', pathname)}`}>
                <span className='c-mobile-navbar__icon-container'>
                  <CDNIcon
                    filename='menu/report-history_26x26.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                  <CDNIcon
                    filename='menu/report-history_26x26_active.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
                </span>
                Report History
              </a>
            </div>

            <div
              className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--group-header ${isToolsGroupOpen ? 'is-open' : ''}`}
              onClick={this.toggleToolsGroup.bind(this)}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/tools_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/tools_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Tools
              <CDNIcon filename='chevron_20x10.svg' />
            </div>

            <div
              className='c-mobile-navbar__menu-group js-tools-group'
              style={{maxHeight: `${isToolsGroupOpen ? toolsGroupHeight : 0}px`}}>
              <a
                href='/app/build/business_launcher?ref=navbar'
                className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--sub-item ${isActive('/app/build/business_launcher', pathname)}`}>
                <span className='c-mobile-navbar__icon-container'>
                  <CDNIcon
                    filename='menu/business-launcher_26x26.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                  <CDNIcon
                    filename='menu/business-launcher_26x26_active.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
                </span>
                BusinessLauncher
              </a>

              <a
                href='/app/build/credit_sweeper?ref=navbar'
                className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--sub-item ${isActive('/app/build/credit_sweeper', pathname)}`}>
                <span className='c-mobile-navbar__icon-container'>
                  <CDNIcon
                    filename='menu/disputes_26x26.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                  <CDNIcon
                    filename='menu/disputes_26x26_active.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
                </span>
                Disputes
              </a>

              <a
                href='/build/credit-target?ref=navbar'
                className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--sub-item ${isActive('/build/credit-target', pathname)}`}>
                <span className='c-mobile-navbar__icon-container'>
                  <CDNIcon
                    filename='menu/goals_26x26.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                  <CDNIcon
                    filename='menu/goals_26x26_active.svg'
                    className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
                </span>
                Goals
              </a>
            </div>

            <a
              href='/app/alerts?ref=navbar'
              className={`c-mobile-navbar__menu-item ${isActive('/app/alerts', pathname)}`}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/alerts_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/alerts_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Alerts
            </a>

            <a
              href='https://www.nav.com/blog/'
              target='_blank'
              className='c-mobile-navbar__menu-item'>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/blog_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
              </span>
              Blog
            </a>

            <a
              href='/app/settings?ref=navbar'
              className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--dark-item ${isActive('/app/settings', pathname)}`}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/settings_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/settings_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Settings
            </a>

            <a
              href='/app/profile?ref=navbar'
              className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--dark-item ${isActive('/app/profile', pathname)}`}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/profile_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/profile_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Profile
            </a>

            <a
              href='/business-lookup?ref=navbar'
              className={`c-mobile-navbar__menu-item c-mobile-navbar__menu-item--dark-item ${isActive('/business-lookup', pathname)}`}>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/business-search_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/business-search_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Business Look Up
            </a>

            <a
              href='/logout?ref=navbar'
              className='c-mobile-navbar__menu-item c-mobile-navbar__menu-item--dark-item'>
              <span className='c-mobile-navbar__icon-container'>
                <CDNIcon
                  filename='menu/logout_26x26.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--inactive' />
                <CDNIcon
                  filename='menu/logout_26x26_active.svg'
                  className='c-mobile-navbar__icon c-mobile-navbar__icon--active' />
              </span>
              Logout
            </a>
            <div className='c-mobile-navbar__menu-item c-mobile-navbar__menu-item--spacer' />
          </div>

          <a className='c-mobile-navbar__exit-block' onClick={() => {
            toggle(!isMobileMenuShown)
          }} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const element = findDOMNode(this)
    const reportsGroup = element.querySelector('.js-reports-group')
    const reportsGroupHeight = Math.ceil(reportsGroup.scrollHeight)
    const toolsGroup = element.querySelector('.js-tools-group')
    const toolsGroupHeight = Math.ceil(toolsGroup.scrollHeight)

    this.setState({reportsGroupHeight, toolsGroupHeight})
  }

  toggleReportsGroup () {
    const { isReportsGroupOpen } = this.state

    this.setState({isReportsGroupOpen: !isReportsGroupOpen})
  }

  toggleToolsGroup () {
    const { isToolsGroupOpen } = this.state

    this.setState({isToolsGroupOpen: !isToolsGroupOpen})
  }
}

function isActive (path, pathname) {
  if (pathname.indexOf(path) > -1) return 'is-active'
}
