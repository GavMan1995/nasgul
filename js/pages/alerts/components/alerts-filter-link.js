import React from 'react'

export default function AlertsFilterLink (props) {
  const { children, currentFilter, targetFilter, onClick } = props

  let filterClass = ''

  if (currentFilter === targetFilter) filterClass = 'alert__menu--selected'

  return (
    <a
      className={filterClass}
      onClick={onClick}>
      {children}
    </a>
  )
}
