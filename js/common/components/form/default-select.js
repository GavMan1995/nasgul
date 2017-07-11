import React from 'react'

import SelectorState from './form-elements/selector-state'
import SelectorDayOrMonth from './form-elements/selector-day-or-month'
import SelectorYear from './form-elements/selector-year'
import StyleWrapper from './form-elements/style-wrapper'

export default function DefaultSelect (props) {
  const {
    customBasis,
    customClasses,
    isInvalid = false,
    isPrivate = false,
    hasValue = false,
    label,
    name,
    onChange,
    onFocus,
    type,
    value
  } = props

  let select = null

  if (type === 'state') {
    select = (
      <SelectorState
        isPrivate={isPrivate}
        onChange={onChange}
        onFocus={onFocus}
        value={value} />
    )
  }

  if (type === 'day') {
    select = (
      <SelectorDayOrMonth
        dateOptions={31}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        value={value} />
    )
  }

  if (type === 'month') {
    select = (
      <SelectorDayOrMonth
        dateOptions={12}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        value={value} />
    )
  }

  if (type === 'year') {
    select = (
      <SelectorYear
        dateOptions={100}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        value={value} />
    )
  }

  return (
    <StyleWrapper
      customBasis={customBasis}
      customClasses={customClasses}
      isInvalid={isInvalid}
      hasValue={hasValue}
      label={label}
      type='select'>
      {select}
    </StyleWrapper>
  )
}
