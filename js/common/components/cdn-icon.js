import React from 'react'

import CDNAsset from './cdn-asset'

export default function CDNIcon (props) {
  const { filename } = props

  return (
    <CDNAsset
      {...props}
      directory='design-assets/icons'
      filename={filename} />
  )
}
