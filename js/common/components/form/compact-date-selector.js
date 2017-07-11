import React from 'react'

import SelectorDayOrMonth from './form-elements/selector-day-or-month'
import SelectorYear from './form-elements/selector-year'
import StyleWrapper from './form-elements/style-wrapper'

export default function CompactDateSelector (props) {
  const {
    day,
    isInvalid = false,
    isPrivate = false,
    hasValue = false,
    label = 'Select Date',
    month,
    onChange,
    onFocus,
    year
  } = props

  return (
    <StyleWrapper
      customClasses='c-select--select-group'
      isInvalid={isInvalid}
      hasValue={hasValue}
      label={label}
      type='input'>
      <SelectorDayOrMonth
        dateOptions={12}
        defaultValue='MM'
        isPrivate={isPrivate}
        name='month'
        onChange={onChange}
        onFocus={onFocus}
        value={month} />
      <SelectorDayOrMonth
        dateOptions={31}
        defaultValue='DD'
        isPrivate={isPrivate}
        name='day'
        onChange={onChange}
        onFocus={onFocus}
        value={day} />
      <SelectorYear
        dateOptions={100}
        defaultValue='YY'
        isPrivate={isPrivate}
        name='year'
        onChange={onChange}
        onFocus={onFocus}
        value={year} />
      <label>{label}</label>
    </StyleWrapper>
  )
}
