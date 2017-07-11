import React from 'react'

import BrandLogo from './brand-logo'

export default function BasicHeader () {
  return (
    <div className='o-navbar c-navbar c-navbar--short'>
      <div className='c-navbar__top'>
        <div className='o-site-container'>
          <BrandLogo />
        </div>
      </div>
    </div>
  )
}
