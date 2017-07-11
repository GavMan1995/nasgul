import React, { Component } from 'react'

import DropdownBusiness from './dropdown-business'

export default class BusinessSelector extends Component {
  render () {
    const { activeBusiness, businesses } = this.props

    if (businesses.length <= 1) return null

    return (
      <div className='c-business-select c-dropdown-menu'>
        <div className='c-business-select__active-business c-dropdown-menu__title'>
          <p className='c-business-select__business-name'>
            {activeBusiness.name}
          </p>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/icon_chevron_down_8x3_gray.svg'
            className='c-business-select__chevron' />
        </div>

        <div className='c-dropdown-menu__dropdown'>
          {businesses.map((business, index) => {
            return (
              <DropdownBusiness
                key={index}
                business={business}
                onClick={this.setActiveBusiness.bind(this)} />
            )
          })}
        </div>
      </div>
    )
  }

  setActiveBusiness (event, businessId) {
    window.location.href = `/change-business?businessId=${businessId}`
  }
}
