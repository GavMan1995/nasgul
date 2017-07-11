import React from 'react'

import VMasker from 'vanilla-masker'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default function InputCreditCard (props) {
  const {
    customBasis,
    customClasses,
    label,
    name,
    isInvalid,
    onChange,
    onFocus,
    value
  } = props
  return (
    <StyleWrapper
      customBasis={customBasis}
      customClasses={customClasses}
      isInvalid={isInvalid}
      hasValue={value}
      label={label}
      type='input'>
      <input
        className='js-private'
        data-recurly='number'
        maxLength='19'
        name={name}
        placeholder=''
        type='text'
        value={value}
        onChange={(event) => { masker(event, onChange) }}
        onFocus={onFocus} />
    </StyleWrapper>
  )
}

function masker (event, onChange) {
  let value = event.target.value

  value = VMasker.toPattern(value, '9999 9999 9999 9999')

  event.target.value = value

  onChange(event)
}
