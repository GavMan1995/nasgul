import React, { Component } from 'react'

import ConfirmDiscount from './confirm-discount'
import DiscountApplied from './discount-applied'
import DiscountOption from './discount-option'

export default class DiscountDisplay extends Component {
  constructor (props) {
    super(props)

    this.state = {
      display: 'DiscountOption'
    }
  }

  render () {
    const { currentPlan } = this.props
    const { display } = this.state

    return (
      <div className='c-i-would-stay-panel'>
        {/* Offer a discount to not downgrade */}
        <DiscountOption
          currentPlan={currentPlan}
          show={display === 'DiscountOption'}
          showConfirm={this.showConfirm.bind(this)} />

        {/* Confirm discount not to downgrade */}
        <ConfirmDiscount
          applyDiscount={this.applyDiscount.bind(this)}
          currentPlan={currentPlan}
          show={display === 'ConfirmDiscount'} />

        {/* A discount has been applied */}
        <DiscountApplied
          show={display === 'DiscountApplied'} />
      </div>
    )
  }

  showConfirm () {
    this.setState({ display: 'ConfirmDiscount' })
  }

  applyDiscount () {
    window.analytics.track('Applied downgrade save discount',
      {
        category: 'ChangePlan:DowngradeSave',
        source: 'webapp'
      }
    )

    window.fetch('/client/promos/downgrade_save', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': this.props.crumb
      },
      credentials: 'include'

    }).then((response) => {
      if (response.ok) {
        // TODO: implement this once the facehugger dashboard is complete and remove showDiscountAppliedMessage
        // Cookies.set('message', 'Success! The discount has been applied to your current Nav subscription!')
        // window.location.href = '/app/dashboard'
        this.setState({ display: 'DiscountApplied' })
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 3500)
      } else {
        if (response.status === 401) {
          window.location.reload(true)
        } else {
          this.props.showError('There was an error applying your coupon. Go ahead and try it again. If that doesn\'t work please call Member Services at 855-226-8388.')
        }
      }
    })
  }
}
