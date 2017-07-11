import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

export default function BureauLogos (props) {
  return (
    <div className='c-register-image-container'>
      <div className='c-register-image'>
        <CDNAsset directory='images' filename='experian-logo.png' />
      </div>

      <div className='c-register-image'>
        <CDNAsset directory='images' filename='transunion-logo.png' />
      </div>

      <div className='c-register-image'>
        <CDNAsset directory='images' filename='dandb-logo.png' />
      </div>

      <div className='c-register-image'>
        <CDNAsset directory='images' filename='fico-logo.png' />
      </div>
    </div>
  )
}
