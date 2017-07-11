import React from 'react'

import VMasker from 'vanilla-masker'

export default function InputField (props) {
  const {
    className = '',
    isPrivate,
    maskType,
    maxLength = false,
    name,
    onChange,
    onFocus,
    placeholder = '',
    recurlyTag,
    type = 'text',
    value = ''
  } = props

  let classes = [className]

  if (isPrivate) classes.push('js-private')

  classes = classes.join(' ')

  return (
    <input
      className={classes}
      data-recurly={recurlyTag}
      maxLength={maxLength}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(event) => { masker(event, maskType, onChange) }}
      onFocus={onFocus} />
  )
}

function masker (event, mask, onChange) {
  let value = event.target.value

  switch (mask) {
    case 'money':
      VMasker.toMoney(value, {
        precision: 0,
        delimiter: ',',
        unit: '$'
      })
      break
    case 'phone':
      value = VMasker.toPattern(value, '999-999-9999')
      break
    case 'ssn':
      value = VMasker.toPattern(value, '999-99-9999')
      break
    case 'zip':
      value = VMasker.toPattern(value, '99999')
      break
    case 'creditcard':
      value = VMasker.toPattern(value, '9999999999999999')
      break
    case 'cvv':
      value = VMasker.toPattern(value, '9999')
      break
  }

  event.target.value = value

  onChange(event)
}
