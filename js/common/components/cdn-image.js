import React from 'react'

import CDNAsset from './cdn-asset'

export default function CDNImage (props) {
  const { filename } = props

  return (
    <CDNAsset
      {...props}
      directory='design-assets/images'
      filename={filename} />
  )
}
