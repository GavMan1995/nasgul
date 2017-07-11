import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../../common/containers/auth-page'

import PremiumPaymentForm from '../components/premium-payment-form'
import DynamicUpgradeHeader from '../components/dynamic-upgrade-header'
import upgradeContextCopy from '../data/upgrade-context-copy'

class PremiumUpgradePage extends Component {
  render () {
    const { address, crumb, location, me } = this.props

    const context = upgradeContextCopy[location.query.context] || upgradeContextCopy.default

    return (
      <div className='o-new-page'>

        <div className='o-site-container'>
          <DynamicUpgradeHeader context={context} />
        </div>

        <div className='c-section--gray'>
          <div className='o-site-container'>
            <div className='c-upgrade-form-section'>
              <div className='c-upgrade-form-info-container'>
                <div className='c-upgrade-form-info-container__header'>
                  <h2>
                    <strong>
                      Same services, one third the price, all in one place.
                    </strong>
                  </h2>
                  <p>
                    Lenders usually look at both your personal and business
                    credit reports. You need to take care of both.
                  </p>
                </div>

                <div className='c-upgrade-form-info'>
                  <h2><strong>Nav Premium Account</strong></h2>
                  <ul className='c-upgrade-form-info__list'>
                    <li>Experian Business Credit Report</li>
                    <li>D&amp;B Business Credit Report</li>
                    <li>2 Personal Credit Reports</li>
                    <li>Business and Personal Monitoring</li>
                    <li>Identity Theft Recovery</li>
                    <li>And More...</li>
                  </ul>
                  <h2 className='c-upgrade-form-info__price'>$29.99 Monthly</h2>
                </div>

                <div className='c-upgrade-form-info'>
                  <h2><strong>Compared with</strong></h2>
                  <div className='c-upgrade-form-info__icon-list'>
                    <div className='c-upgrade-form-info__icon-list-item'>
                      <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/dnb_bullet_40x40.svg' />
                      <div>
                        <p>D&amp;B CreditMonitor</p>
                        <strong>$49.99</strong>
                      </div>
                    </div>

                    <div className='c-upgrade-form-info__icon-list-item'>
                      <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/experian_bullet_40x40.svg' />
                      <div>
                        <p>Experian Credit Advantage</p>
                        <strong>$12.42</strong>
                      </div>
                    </div>

                    <div className='c-upgrade-form-info__icon-list-item'>
                      <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/cs_bullet_40x40.svg' />
                      <div>
                        <p>CreditSesame Pro Credit</p>
                        <strong>$19.95</strong>
                      </div>
                    </div>
                  </div>
                  <h2 className='c-upgrade-form-info__price is-poor'>$82.36 Monthly</h2>
                </div>

                <h3><strong>Bottom Line:</strong> Nav Premium saves you more than $50/month</h3>
              </div>
              <div className='c-upgrade-form-container'>
                <div className='c-upgrade-form'>
                  <PremiumPaymentForm
                    crumb={crumb}
                    me={me}
                    address={address}
                    queryParams={location.query}
                    offerName='Premium General' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='o-site-container'>
          <div className='c-upgrade-page-review-container'>
            <div className='c-upgrade-page-review'>
              <img
                src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/testimonial-ben_snyder.png'
                width='64' height='64' />
              <div className='c-upgrade-page-review__content'>
                <p>
                  &ldquo;Nav Premium helped me solve credit problems in half the
                  amount of time it would've taken me to do myself.&rdquo;
                </p>
                <p>Ben Snyder <br />CEO, Snyder Technologies, LLC</p>
              </div>
            </div>

            <div className='c-upgrade-page-review'>
              <img
                src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/testimonial-john_page.png'
                width='64' height='64' />
              <div className='c-upgrade-page-review__content'>
                <p>
                  &ldquo;I quickly found an erroneous tax lien on my business
                  report with Nav Premium. I resolved it and saved hundreds of
                  dollars in insurance costs.&rdquo;
                </p>
                <p>John Page<br />Page Insurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ crumb, me, address, location }) {
  return { crumb, me, address, location }
}

module.exports = exports.default = connect(mapStateToProps)(AuthPage(PremiumUpgradePage))
module.exports.jsFilename = 'premium-upgrade'
