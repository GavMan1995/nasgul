import React from 'react'

import capitalize from 'lodash.capitalize'
import { format } from 'fecha'
import prettyMoneyString from '../utils/pretty-money-string'
import dbtColor from '../components/dbt-color'

export default function TradeAccountCard ({ account, accountNumber }) {
  return (
    <div className='o-enterprise-card'>
      <div className='o-enterprise-card__section o-enterprise-card__section--header'>
        <strong>Trade Account {accountNumber + 1}</strong>
      </div>

      <div className='o-enterprise-card__section-container'>
        <div className='c-list-card-section'>
          <strong>Account Type:</strong>
          <p>{capitalize(account.classification)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Date Reported:</strong>
          <p>{format(new Date(account.reported_at), 'M/D/YYYY')}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Date of Last Activity:</strong>
          <p>{format(new Date(account.last_activity_at), 'M/D/YYYY')}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Terms:</strong>
          <p>{account.terms}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Recent High Credit:</strong>
          <p>{prettyMoneyString(account.highest_credit_last_six_months)}</p>
        </div>

        <div className='c-list-card-section'>
          <strong>Account Balance:</strong>
          <p>{prettyMoneyString(account.balance)}</p>
        </div>
      </div>

      <div className='o-enterprise-card__section-container'>
        <div className='c-trade-account-tab-card-section'>
          <p><strong>Payment Status</strong></p>
          <div className='c-trade-account-tab-card-section__tab-container'>
            <small>Payments Current</small>
            <span
              style={{backgroundColor: paymentStatusColor(account.current_payment_percent)}}
              className='c-trade-account-tab-card-section__tab'>
              {account.current_payment_percent}%
            </span>
          </div>
        </div>

        <div className='c-trade-account-tab-card-section'>
          <p><strong>Days Beyond Terms</strong></p>
          <div className='c-trade-account-tab-card-section__tab-container'>
            <small>1-30 DBT</small>
            <span
              style={{backgroundColor: dbtColor(account.days_beyond_terms_30_days)}}
              className='c-trade-account-tab-card-section__tab'>
              {account.days_beyond_terms_30_days}%
            </span>
          </div>

          <div className='c-trade-account-tab-card-section__tab-container'>
            <small>1-60 DBT</small>
            <span
              style={{backgroundColor: dbtColor(account.days_beyond_terms_60_days)}}
              className='c-trade-account-tab-card-section__tab'>
              {account.days_beyond_terms_60_days}%
            </span>
          </div>

          <div className='c-trade-account-tab-card-section__tab-container'>
            <small>1-90 DBT</small>
            <span
              style={{backgroundColor: dbtColor(account.days_beyond_terms_90_days)}}
              className='c-trade-account-tab-card-section__tab'>
              {account.days_beyond_terms_90_days}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  function paymentStatusColor (paymentStatus) {
    if (paymentStatus > 80) {
      return '#00BB7B'
    } else if (paymentStatus > 60) {
      return '#81eaac'
    } else if (paymentStatus > 40) {
      return '#FFC709'
    } else if (paymentStatus > 20) {
      return '#f9a000'
    } else if (paymentStatus >= 0) {
      return '#ED193F'
    } else {
      return '#8A9097'
    }
  }
}
