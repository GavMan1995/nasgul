import React, { Component } from 'react'

export default class BillingCycleToggle extends Component {
  constructor (props) {
    super(props)

    this.state = { isActive: 'monthly' }
  }

  render () {
    return (
      <div className='c-payment-period-container'>
        <div className='c-payment-period-header-info'>
          <h1>Select Your Nav Account</h1>
          <p>
            Your business is unique—and one-size-fits-all can leave you
            underserved or overcharged. We offer accounts that fit all of your
            credit and financing needs, from our standard account that provides
            your credit highlights, to premium accounts that give you the
            details that lenders “see” about you. Get started now:
          </p>
        </div>
        <div className='c-payment-period-btn-container'>
          <button
            className={`c-payment-period-btn ${this.state.isActive === 'monthly' ? 'is-active' : ''}`}
            onClick={() => this.toggleFrequencyBtn('monthly')}>
            <strong>Monthly</strong>
            <p>&nbsp;</p>
          </button>
          <button
            className={`c-payment-period-btn ${this.state.isActive === 'quarterly' ? 'is-active' : ''}`}
            onClick={() => this.toggleFrequencyBtn('quarterly')}>
            <strong>Quarterly</strong>
            <p>Best Value</p>
          </button>
        </div>
      </div>
    )
  }

  toggleFrequencyBtn (plan) {
    this.props.toggleFrequency(plan)

    this.setState({ isActive: plan })
  }
}
