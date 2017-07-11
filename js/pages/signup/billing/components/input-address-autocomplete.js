import React from 'react'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'
import InputAutocompleteAddress from '../../../../common/components/form/form-elements/input-autocomplete-address'

export default function InputAddressAutoComlete (props) {
  const {
    customBasis,
    customClasses,
    isForRecurly,
    label,
    name,
    isInvalid,
    onChange,
    onFocus,
    updateAddressState,
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
      <InputAutocompleteAddress
        name={name}
        onFocus={onFocus}
        onChange={onChange}
        updateAddressState={updateAddressState}
        isForRecurly={isForRecurly}
        value={value} />
    </StyleWrapper>
  )
}
