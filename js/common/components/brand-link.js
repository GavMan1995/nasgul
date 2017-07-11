import React from 'react'

import CDNAsset from './cdn-asset'

export default function BrandLink () {
  return (
    <a href='/?ref=navbar' className='c-navbar__logo'>
      <CDNAsset
        height='21'
        directory='images/nav'
        filename='logo-name-blue.svg' />
    </a>
  )
}
