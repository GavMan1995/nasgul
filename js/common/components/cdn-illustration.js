import React from 'react'

import CDNAsset from './cdn-asset'

export default function CDNIllustration (props) {
  const { filename } = props

  return (
    <CDNAsset
      {...props}
      directory='design-assets/illustrations'
      filename={filename} />
  )
}
