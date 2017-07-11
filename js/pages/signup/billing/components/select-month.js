import React, { Component } from 'react'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default class SelectMonth extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.value || '' }
  }

  render () {
    const {
      customBasis,
      customClasses,
      isForRecurly = false,
      label,
      name,
      isInvalid,
      onChange,
      onFocus
    } = this.props
    const { value } = this.state

    let privateClass = (isForRecurly) ? 'js-private' : ''
    let recurlyTag = (isForRecurly) ? 'month' : ''

    return (
      <StyleWrapper
        customBasis={customBasis}
        customClasses={customClasses}
        isInvalid={isInvalid}
        hasValue={value}
        label={label}
        type='select'>
        <select
          className={privateClass}
          data-recurly={recurlyTag}
          name={name}
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value })

            onChange(event)
          }}
          onFocus={onFocus}>
          <option value='' hidden />
          {getDateOptions(12)}
        </select>
      </StyleWrapper>
    )
  }
}

function getDateOptions (qty) {
  let options = []

  for (let i = 1; i <= qty; i++) {
    const display = (i < 10) ? `0${i}` : i
    options.push(<option key={Math.random()} value={display}>{display}</option>)
  }

  return options
}
