import React, { Component } from 'react'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default class SelectYear extends Component {
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
    let recurlyTag = (isForRecurly) ? 'year' : ''

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
          {getDateOptions(15)}
        </select>
      </StyleWrapper>
    )
  }
}

function getDateOptions (dateOptions) {
  const thisYear = new Date().getFullYear()
  const startYear = thisYear + dateOptions

  let options = []

  for (let i = thisYear; i <= startYear; i++) {
    options.push(<option key={Math.random()} value={i}>{i}</option>)
  }
  return options
}
