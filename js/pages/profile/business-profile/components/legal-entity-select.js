import React, { Component } from 'react'

import ToggleCallbacks from '../../components/toggle-callbacks'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

class LegalEntitySelect extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.defaultValue || '' }
  }

  render () {
    const {
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
          type='select'>
          <select
            name={name || ''}
            value={value}
            onChange={this.handleChange.bind(this)}>
            <option value='' />
            <option value='S-Corp'>S-Corp</option>
            <option value='C-Corp'>C-Corp</option>
            <option value='LLC'>LLC</option>
            <option value='Non - Profit'>Non - Profit</option>
            <option value='Partnership'>Partnership</option>
            <option value='Sole Prop'>Sole Prop</option>
            <option value='Trust'>Trust</option>
          </select>
        </StyleWrapper>
      )
    } else {
      return (
        <div className='c-select is-locked' onClick={enableEdit}>
          <span >{label}</span>
          <p>{value || '?'}</p>
        </div>
      )
    }
  }

  handleChange (event) {
    this.setState({ value: event.target.value })

    this.props.changeCallback(event)
  }
}

export default ToggleCallbacks(LegalEntitySelect)
