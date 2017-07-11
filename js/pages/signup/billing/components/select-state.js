import React, { Component } from 'react'

import stateAbbreviations from '../../../../common/data/state-abbreviations'
import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default class SelectState extends Component {
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
    let recurlyTag = (isForRecurly) ? 'state' : ''

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
          {stateAbbreviations.map((state) => {
            return <option key={state} value={state}>{state}</option>
          })}
        </select>
      </StyleWrapper>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== '') this.setState({ value: nextProps.value })
  }
}
