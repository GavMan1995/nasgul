import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import EssentialPaymentForm from '../components/essential-payment-form'

class EssentialUpgradePage extends Component {
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
            <span>Nav Essential</span>
          </div>
          <a
            href='#upgrade'
            className='btn -primary-4'>
            Upgrade
          </a>
        </div>

        <div
          data-flex--item='full'
          className='_section _hero'>
          <div data-flex--item='site-container'>
            <h1 data-flex--item='full'>Get Your Business Ready for Funding</h1>
            <h2 data-flex--item='full'>
              Essential is the best way to make sure your credit is in good shape—until your business is tracked by the bureaus.
            </h2>
            <a
              href='#upgrade'
              className='btn -primary-4'>
              Upgrade to Essential
            </a>
          </div>
        </div>

        <div data-flex--item='full' className='_section _why -gray'>
          <div data-flex--item='site-container'>
            <div
              data-flex--item='basis--400 grow--1'
              data-flex--container='right'
              className='_details'>
              <div data-flex--item='basis--400'>
                <h3 data-flex--item='full'>Unlock your credit details</h3>
                <p data-flex--item='full'>
                  Your Standard account provides a nice overview of your credit life.
                  But Essential gives you access to report details and powerful tools to
                  take control of your credit.
                </p>

                <h4 data-flex--item='full'>
                  Your reports <strong>may</strong> have unviewed information:
                </h4>

                <div data-flex--item='full' className='_alert-examples'>
                  <div data-flex--item='full' data-flex--container='nowrap right'>
                    <span>Derogatory Account Specifics</span>
                    <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-alert-triangle.svg' height='20' />
                  </div>
                  <div data-flex--item='full' data-flex--container='nowrap right'>
                    <span>Credit Inquiries</span>
                    <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-alert-triangle.svg' height='20' />
                  </div>
                  <div data-flex--item='full' data-flex--container='nowrap right'>
                    <span>Personal Credit Account Details</span>
                    <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-alert-triangle.svg' height='20' />
                  </div>
                </div>
              </div>
            </div>

            <div data-flex--item='basis--400 grow--1' className='_score-card'>
              <div data-flex--item='basis--200 grow--1'>
                <div data-flex--item='full' className='_header'>
                  <p data-flex--item='full'>Here's what you have.</p>
                </div>

                <div data-flex--container='center' className='_content'>
                  <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/score-grade-d.svg'
                    height='122' />

                  <h5 data-flex--item='full'>Limited Summary Reports</h5>
                  <p data-flex--item='full'>
                    Credit grades instead of actual scores.
                  </p>

                  <span data-flex--item='full'>
                    No details of what's impacting your credit.
                  </span>
                </div>
              </div>

              <div data-flex--item='basis--200 grow--1' className='-gray'>
                <div data-flex--item='full' className='_header'>
                  <p data-flex--item='full'>Here's what will change</p>
                </div>
                <div data-flex--container='center' className='_content'>
                  <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/score-number-essential-122x122.svg'
                    height='122' />

                  <h5 data-flex--item='full'>
                    Detailed Credit Reports
                  </h5>
                  <p data-flex--item='full'>
                    Personal credit scores that lenders use.
                  </p>

                  <span data-flex--item='full'>
                    See what's impacting your score.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div data-flex--item='full' className='_section _bureaus'>
          <div data-flex--item='site-container' data-flex--container='center'>
            <p data-flex--item='full'>Nav is the only place to get four reports from three bureaus</p>
            <div data-flex--container='center'>
              <div data-flex--container='center'>
                <img src='https://dxkdvuv3hanyu.cloudfront.net/images/dandb-logo.png' />
              </div>

              <div data-flex--container='center'>
                <img src='https://dxkdvuv3hanyu.cloudfront.net/images/experian-logo.png' />
              </div>

              <div data-flex--container='center'>
                <img src='https://dxkdvuv3hanyu.cloudfront.net/images/transunion-logo.png' />
              </div>
            </div>
          </div>
        </div>

        <div data-flex--item='full' className='_section _membership -blue'>
          <div data-flex--item='site-container' data-flex--container='center'>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/icons/essential-gem-78x78.svg'
              height='78'
              data-flex--item='pull--center' />

            <h2 data-flex--item='full'>Your Essential Account Includes</h2>

            <div data-flex--item='basis--400 grow--1 max--500' className='_details'>
              <h5 data-flex--item='full'>Detailed Personal Credit Reports</h5>
              <p data-flex--item='full'>
                Get access to the data banks and lenders use to judge you
              </p>

              <hr />

              <h5 data-flex--item='full'>Business Summary Credit Reports</h5>
              <p data-flex--item='full'>
                See the basic credit info for your business as you build your business credit.
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

              <a
                href='#upgrade'
                data-flex--item='full'
                className='btn -primary-2'>
                Upgrade to Essential
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
              <EssentialPaymentForm
                crumb={this.props.crumb}
                me={this.props.me}
                address={this.props.address}
                queryParams={this.props.location.query}
                offerName='Essential General' />

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
                        "Nav helped me solve credit problems in half the
                        amount of time it would've taken me to do myself."
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
                        "I quickly found an erronneous tax lien on my business report
                        with Nav. I resolved it and saved hundreds of dollars
                        in insurance costs."
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

module.exports = exports.default = connect(mapStateToProps)(AuthPage(EssentialUpgradePage))
module.exports.jsFilename = 'essential-upgrade'
