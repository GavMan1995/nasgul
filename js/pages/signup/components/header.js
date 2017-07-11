import React from 'react'

import CDNIcon from '../../../common/components/cdn-icon'

export default function Header (props) {
  const { icon, title } = props

  let img = null

  if (icon) img = <CDNIcon width='80' height='80' filename={icon} />

  return (
    <div className='c-signup-page__header'>
      {img}

      <h1>{title}</h1>
    </div>
  )
}
