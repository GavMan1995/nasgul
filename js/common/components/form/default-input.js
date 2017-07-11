import React from 'react'

import Input from './form-elements/input'
import InputAutocompleteAddress from './form-elements/input-autocomplete-address'
import StyleWrapper from './form-elements/style-wrapper'

export default function DefaultInput (props) {
  const {
    customBasis,
    customClasses,
    isInvalid = false,
    isPrivate = false,
    label,
    maskType,
    maxLength,
    name,
    onChange,
    onFocus,
    recurlyTag,
    type,
    updateAddressState,
    value
  } = props

  let input = (
    <Input
      isPrivate={isPrivate}
      maskType={maskType}
      maxLength={maxLength}
      name={name}
      onFocus={onFocus}
      onChange={onChange}
      recurlyTag={recurlyTag}
      value={value} />
  )

  if (type === 'address') {
    input = (
      <InputAutocompleteAddress
        isPrivate={isPrivate}
        name={name}
        onFocus={onFocus}
        onChange={onChange}
        updateAddressState={updateAddressState}
        recurlyTag={recurlyTag}
        value={value} />
    )
  }

  return (
    <StyleWrapper
      customBasis={customBasis}
      customClasses={customClasses}
      isInvalid={isInvalid}
      hasValue={value}
      label={label}
      type='input'>
      {input}
    </StyleWrapper>
  )
}
