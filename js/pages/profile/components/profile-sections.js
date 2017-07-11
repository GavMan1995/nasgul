import React from 'react'

export default function ProfileSections (props) {
  const { children, clickTarget, location } = props

  let tabClass = ''

  if (location.pathname === clickTarget) tabClass = '-tab-selected'

  return (
    <li
      data-flex--item='full p--md'
      className={tabClass}
      onClick={() => { window.location.href = clickTarget }}>
      {children}
    </li>
  )
}
