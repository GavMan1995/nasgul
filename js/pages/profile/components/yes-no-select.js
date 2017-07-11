import React, { Component } from 'react'

import StyleWrapper from '../../../common/components/form/form-elements/style-wrapper'

export default class YesNoSelect extends Component {
  constructor (props) {
    super(props)

    this.state = { value: `${props.defaultValue}` || 'true' }
  }

  render () {
    const {
      customBasis,
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
          customBasis={customBasis}
          customClasses={customClasses}
          isInvalid={isInvalid}
          hasValue={value}
          label={label}
          type='select'>
          <select
            name={name}
            value={value}
            onChange={this.handleChange.bind(this)}>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </StyleWrapper>
      )
    } else {
      return (
        <div className='c-input is-locked' onClick={enableEdit}>
          <span >{label}</span>
          <p>{value === 'true' ? 'Yes' : 'No'}</p>
        </div>
      )
    }
  }

  handleChange (event) {
    this.setState({ value: event.target.value })
  }
}
