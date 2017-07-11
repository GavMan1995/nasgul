import React from 'react'

export default function StyleWrapper (props) {
  const {
    customBasis,
    customClasses,
    isInvalid = false,
    hasValue = false,
    label = '',
    type
  } = props

  let baseClass

  if (type === 'input') baseClass = 'c-input'

  if (type === 'select') baseClass = 'c-select'

  let classes = [baseClass]

  classes.push(customClasses)

  if (isInvalid) classes.push('has-error')

  if (hasValue) classes.push('is-filled')

  classes = classes.join(' ')

  return (
    <div className={classes} style={{ flexBasis: customBasis }}>
      {props.children}
      <label>{label}</label>
    </div>
  )
}
