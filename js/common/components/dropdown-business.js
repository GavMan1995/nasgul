import React from 'react'

export default function DropdownBusiness ({ business, onClick }) {
  let ownedFlag = null

  if (business.isOwned) {
    ownedFlag = (
      <img
        src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-flag-owned.svg'
        height='32'
        className='c-business-select__owned-icon' />
    )
  }

  return (
    <div
      className='c-dropdown-menu__option c-business-select__business'
      onClick={(event) => onClick(event, business.id)}>
      <p className='c-business-select__business-name'>{business.name}</p>
      {ownedFlag}
    </div>
  )
}
