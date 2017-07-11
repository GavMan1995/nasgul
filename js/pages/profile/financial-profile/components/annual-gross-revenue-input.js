import React, { Component } from 'react'

import VMasker from 'vanilla-masker'

import ToggleCallbacks from '../../components/toggle-callbacks'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

class AnnualGrossRevenueInput extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.defaultValue || '' }
  }

  render () {
    const {
      changeCallback,
      customClasses,
      canEdit,
      enableEdit,
      isInvalid,
      label,
      name
    } = this.props
    const { value } = this.state

    if (canEdit) {
      return (
        <StyleWrapper
          customBasis='250px'
          customClasses={customClasses}
          isInvalid={isInvalid}
          hasValue={value}
          label={label}
          type='input'>
          <input
            ref={(element) => { this.input = element }}
            name={name || ''}
            type='text'
            value={value}
            onChange={(event) => {
              this.setState({ value: event.target.value })

              changeCallback(event)
            }} />
        </StyleWrapper>
      )
    } else {
      return (
        <div className='c-input is-locked' onClick={enableEdit}>
          <span >{label}</span>
          <p>{value || '?'}</p>
        </div>
      )
    }
  }

  componentDidMount () {
    if (this.props.canEdit) VMasker(this.input).maskNumber()
  }
}

export default ToggleCallbacks(AnnualGrossRevenueInput)
