import React from 'react'

import CDNIcon from '../../../common/components/cdn-icon'

export default function DynamicUpgradeHeader (props) {
  const { context } = props

  if (!context) return null

  let contextIcon = context.icon ? <CDNIcon filename={context.icon} /> : null

  return (
    <div className='c-upgrade-page-hero'>
      {contextIcon}
      <h1>{context.header}</h1>
      {context.mainCopy && context.mainCopy.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>
      })}
      {context.numberedList && context.numberedList.map((number, index) => {
        return <li className='c-upgrade-page-hero__numbered-bullet' key={index}>{number}</li>
      })}
      {context.bullets && context.bullets.map((bullet, index) => {
        return <li key={index}>{bullet}</li>
      })}
      {context.subCopy && context.subCopy.map((paragraph, index) => {
        return <p key={index}>{paragraph}</p>
      })}
    </div>
  )
}
