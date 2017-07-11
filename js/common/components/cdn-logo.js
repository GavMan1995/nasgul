import React from 'react'

import CDNAsset from './cdn-asset'

export default function CDNLogo (props) {
  const { filename } = props

  return (
    <CDNAsset
      {...props}
      directory='design-assets/logos'
      filename={filename} />
  )
}
