import React from 'react'

import BrandLogo from './brand-logo'

export default function MobileAuthHeader ({ isMobileMenuShown, toggle }) {
  return (
    <div className={`c-mobile-navbar ${isMobileMenuShown ? 'c-mobile-navbar--open' : ''}`}>
      <div className='c-mobile-navbar__bar'>
        <BrandLogo />
      </div>
    </div>
  )
}
