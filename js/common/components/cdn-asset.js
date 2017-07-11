import omit from 'lodash.omit'

import React from 'react'

export default function CDNAsset (props) {
  const { directory, filename } = props

  // TODO: Find how to properly store base URL in env config...
  return (
    <img
      {...omit(props, ['directory', 'filename'])}
      src={`https://dxkdvuv3hanyu.cloudfront.net/${directory}/${filename}`} />
  )
}
