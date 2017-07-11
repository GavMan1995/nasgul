import React, { Component } from 'react'

import Tradeline from './tradeline'
import CDNIcon from '../../../../../common/components/cdn-icon'

export default class ActiveAccountsCard extends Component {
  render () {
    const { report } = this.props
    const {
      executive_summary: summary,
      payment_experiences: tradelines
    } = report.attributes

    if (tradelines.length < 1) return null

    return (
      <div className='o-enterprise-info-container'>
        <div className='c-enterprise__info-header'>
          <div className='c-enterprise__info-header-img'>
            <CDNIcon filename='icon_ent_money_24x24.svg' />
          </div>
          <h2>{summary.payment_experiences.total_payment_experience_received} Active Accounts</h2>
        </div>

        {tradelines.map((tradeline, index) => {
          return <Tradeline tradeline={tradeline} accountNumber={index + 1} key={index} />
        })}
      </div>
    )
  }
}
