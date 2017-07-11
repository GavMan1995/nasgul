import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import PremiumPlusPaymentForm from '../components/premium-plus-payment-form'

class PremiumPlusUpgradePage extends Component {
  render () {
    return (
      <div
        data-flex--item='full'
        data-flex--container='all-grandchildren'
        className='upgrade-page'>
        <div className='_upgrade-top-bar'>
          <div data-flex--container='nowrap' className='_premium-mark'>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/icons/diamond-premium-blue.svg'
              height='16' />
            <span>Nav Premium Plus</span>
          </div>
          <a
            href='#upgrade'
            className='btn -secondary-2'>
            Upgrade
          </a>
        </div>

        <div
          data-flex--item='full'
          className='_section _hero'>
          <div data-flex--item='site-container'>
            <h1 data-flex--item='full' style={{ font: '40px' }}>
              Know if you qualify for an SBA loan before you apply.
            </h1>
            <h2 data-flex--item='full'>
              Nav Premium Plus is the only place to access your <a href='https://www.nav.com/business-credit-scores/fico-sbss/'>FICO® LiquidCredit® SBSS℠ score.</a>
              <br />
              It’s the business credit score the SBA uses to pre-screen their most popular loans.
            </h2>
            <a
              href='#upgrade'
              className='btn -secondary-2'>
              Upgrade to Premium Plus
            </a>
          </div>
        </div>

        <div data-flex--item='full' className='_section _why -gray'>
          <div data-flex--item='site-container full'>
            <div style={{ margin: '32px 0', width: '100%' }}>
              <div
                data-flex--container='center'
                data-flex--item='basis--300 grow--1'
                style={{ paddingRight: '16px' }}>
                <div
                  data-flex--container='row-items--middle' data-flex--item='max--300'>
                  <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/FICO_SBSS_score_gauge_540x540.svg' width='100%' />
                </div>
              </div>

              <div
                data-flex--item='basis--800 grow--2'
                data-flex--container='center'
                style={{ margin: '32px 0' }}>
                <div data-flex--item='basis--300 grow--1' style={{ padding: '0 16px' }}>
                  <h3 data-flex--item='full' style={{ marginBottom: '16px', lineHeight: '1.786' }}>
                    SBSS Ranges from 0 to 300
                  </h3>
                  <p style={{ marginBottom: '16px', lineHeight: '1.786' }}>
                    The minimum score to pass the SBA’s pre-screen process is currently 140. But most lenders set their minimum score at 160. Over 7,500 lenders use the FICO® LiquidCredit® SBSS℠ score.
                  </p>

                  <p style={{ marginBottom: '16px', lineHeight: '1.786' }}>
                    The scoring is based upon personal and business credit history and other financial information. A strong history of business credit with timely payments to vendors and suppliers may help boost your SBSS score.
                  </p>
                </div>

                <div data-flex--item='basis--300 grow--1' style={{ padding: '0 16px' }}>
                  <h3 data-flex--item='full' style={{ marginBottom: '16px' }}>
                    Save Money &amp; Time
                  </h3>
                  <p data-flex--item='full' style={{ marginBottom: '32px', lineHeight: '1.786' }}>
                    SBA loans offer some of the most attractive interest rates around. But, banks don’t want to waste their time filling out lengthy SBA loan applications. They want to check your FICO® LiquidCredit® SBSS℠ score first to see if you're qualified.
                  </p>
                  <p data-flex--item='full' style={{ marginBottom: '32px', lineHeight: '1.786' }}>
                    The Nav Premium Plus account is the only place you can access, track and build your SBSS score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='c-why-isnt-nav-free-container'>
          <h3>Why isn't Nav Premium free?</h3>
          <p>
            We provide as much of your credit information as we can
            for free, but the credit bureaus charge us more money for
            detailed credit information.
          </p>
        </div>

        <div data-flex--item='full' className='_section _membership -blue'>
          <div data-flex--item='site-container' data-flex--container='center'>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/icons/diamond-in-white-circle.svg'
              height='78'
              data-flex--item='pull--center' />

            <h2 data-flex--item='full'>Your Premium Plus Account Includes</h2>

            <div data-flex--item='basis--400 grow--1 max--500' className='_details'>
              <h5 data-flex--item='full'>Detailed Personal Credit Reports</h5>
              <p data-flex--item='full'>
                Get access to the data banks and lenders use to judge you.
              </p>

              <hr />

              <h5 data-flex--item='full'>Detailed Business Credit Reports</h5>
              <p data-flex--item='full'>
                See your full business credit details, so you can build your business credit.
              </p>
            </div>

            <div data-flex--item='basis--400 grow--1 max--500' className='_details'>
              <hr className='_mobile-hr' />

              <h5 data-flex--item='full'>
                $1 Million ID Theft Insurance
              </h5>
              <p data-flex--item='full'>
                Protect your business with our best coverage.
              </p>

              <hr />

              <h5 data-flex--item='full'>
                FICO® LiquidCredit® SBSS℠ Score
              </h5>
              <p data-flex--item='full'>
                Preview what over 7,500 lenders across the nation would see before you apply for financing.
              </p>

            </div>
            <div data-flex--item='full' className='_details'>
              <hr className='_mobile-hr' />
              <a
                href='#upgrade'
                data-flex--item='basis--400 grow--1 max--500 pull--center pull--center'
                className='btn -primary-2'
                style={{ color: '#ff9a16' }}>
                Upgrade to Premium Plus
              </a>
            </div>
          </div>
        </div>

        <div
          id='upgrade'
          data-flex--item='full'
          className='_section _get-it'>
          <div data-flex--item='site-container'>
            <h2 data-flex--item='full'>Plan ahead. Save money.</h2>

            <div data-flex--item='basis--400 grow--1' className='_payment'>
              <PremiumPlusPaymentForm
                crumb={this.props.crumb}
                me={this.props.me}
                address={this.props.address}
                queryParams={this.props.location.query}
                offerName='Premium Plus Reports' />

              <div
                data-flex--item='basis--400 grow--1'
                className='_reviews'>
                <div data-flex--item='basis--400'>
                  <h3 data-flex--item='full'>Real business owners who love Nav</h3>

                  <div data-flex--item='full' data-flex--container='row-items--top'>
                    <img
                      src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/testimonial-ben_snyder.png'
                      width='64' />
                    <div data-flex--item='basis--200 grow--1'>
                      <p>
                        'Nav Premium helped me solve credit problems in half the
                        amount of time it would've taken me to do myself.'
                      </p>
                      <span>
                        Ben Snyder <br />
                        CEO, Snyder Technologies, LLC
                      </span>
                    </div>
                  </div>
                  <div data-flex--item='full' data-flex--container='row-items--top'>
                    <img
                      src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/testimonial-john_page.png'
                      width='64' />
                    <div data-flex--item='basis--200 grow--1'>
                      <p>
                        'I quickly found an erronneous tax lien on my business report
                        with Nav Premium. I resolved it and saved hundreds of dollars
                        in insurance costs.'
                      </p>
                      <span>
                        John Page<br />
                        Page Insurance
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(PremiumPlusUpgradePage))
module.exports.jsFilename = 'premium-plus-upgrade'
