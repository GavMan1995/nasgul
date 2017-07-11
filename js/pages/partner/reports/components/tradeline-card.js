import React, { Component } from 'react'

import prettyMoneyString from '../utils/pretty-money-string'
import safeDateString from '../utils/safe-date-string'
import CDNIcon from '../../../../common/components/cdn-icon'
import dbtColor from '../components/dbt-color'

export default class TradelineCard extends Component {
  constructor (props) {
    super(props)

    this.state = { cardOpen: false }
  }

  render () {
    const { creditUtil, tradeline } = this.props

    return (
      <div className='o-enterprise-card'>
        <div
          className='c-active-accounts-card-header'
          onClick={this.toggleCard.bind(this)}>
          <div className='o-enterprise-card__section o-enterprise-card__section--title'>
            <h4>
              <strong>Tradeline {this.props.accountNumber}</strong>
            </h4>
          </div>
          <div className='o-enterprise-card__section o-enterprise-card__section--sm'>
            <p>{prettyMoneyString(tradeline.balance)}</p>
            <p>
              <strong>Balance</strong>
            </p>
          </div>
          <div className='o-enterprise-card__section o-enterprise-card__section--sm'>
            <p>{creditUtil}%</p>
            <p>
              <strong>Credit Utilization</strong>
            </p>
          </div>
          <div className='o-enterprise-card__section o-enterprise-card__section--sm'>
            <p>{tradeline.current_payment_percent}%</p>
            <p>
              <strong>of Total Debt</strong>
            </p>
          </div>
          <div className={`c-active-accounts-card-header__arrow-section ${this.state.cardOpen ? 'is-open' : ''}`}>
            <CDNIcon filename='chevron_20x10.svg' />
          </div>
        </div>

        <div className={`c-active-accounts-card-body ${this.state.cardOpen ? 'is-open' : ''}`}>
          <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
            <div className='c-list-card-section'>
              <strong>Date Reported:</strong>
              <p>{safeDateString(tradeline.reported_at)}</p>
            </div>

            <div className='c-list-card-section'>
              <strong>Date of Last Activity:</strong>
              <p>{safeDateString(tradeline.last_activity_at)}</p>
            </div>

            <div className='c-list-card-section'>
              <strong>Terms:</strong>
              <p>{tradeline.terms}</p>
            </div>

            <div className='c-list-card-section'>
              <strong>Recent High Credit:</strong>
              <p>{prettyMoneyString(tradeline.highest_credit_last_six_months)}</p>
            </div>

            <div className='c-list-card-section'>
              <strong>Account Balance:</strong>
              <p>{prettyMoneyString(tradeline.balance)}</p>
            </div>
          </div>

          <div className='o-enterprise-card__section-container o-enterprise-card__section-container--md'>
            <div className='c-trade-account-tab-card-section'>
              <p><strong>Days Beyond Terms</strong></p>
              <div className='c-trade-account-tab-card-section__tab-container'>
                <small>1-30 DBT</small>
                <span
                  style={{backgroundColor: dbtColor(tradeline.days_beyond_terms_30_days)}}
                  className='c-trade-account-tab-card-section__tab'>
                  {tradeline.days_beyond_terms_30_days}%
                </span>
              </div>

              <div className='c-trade-account-tab-card-section__tab-container'>
                <small>1-60 DBT</small>
                <span
                  style={{backgroundColor: dbtColor(tradeline.days_beyond_terms_60_days)}}
                  className='c-trade-account-tab-card-section__tab'>
                  {tradeline.days_beyond_terms_60_days}%
                </span>
              </div>

              <div className='c-trade-account-tab-card-section__tab-container'>
                <small>1-90 DBT</small>
                <span
                  style={{backgroundColor: dbtColor(tradeline.days_beyond_terms_90_days)}}
                  className='c-trade-account-tab-card-section__tab'>
                  {tradeline.days_beyond_terms_90_days}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  toggleCard () {
    this.setState({ cardOpen: !this.state.cardOpen })
  }
}
