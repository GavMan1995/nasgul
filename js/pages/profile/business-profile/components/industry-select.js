import React, { Component } from 'react'

import ToggleCallbacks from '../../components/toggle-callbacks'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

class IndustrySelect extends Component {
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
            <option value='Agriculture &amp; landscaping'>Agriculture &amp; landscaping</option>
            <option value='Apparel &amp; accessories'>Apparel &amp; accessories</option>
            <option value='Automotive/bicycle'>Automotive/bicycle</option>
            <option value='Beauty salon/spa'>Beauty salon/spa</option>
            <option value='Building materials'>Building materials</option>
            <option value='Business services'>Business services</option>
            <option value='Construction'>Construction</option>
            <option value='Electronics'>Electronics</option>
            <option value='Grocery &amp; baked goods'>Grocery &amp; baked goods</option>
            <option value='Garden store/retail nursery'>Garden store/retail nursery</option>
            <option value='General merchandise'>General merchandise</option>
            <option value='Health services'>Health services</option>
            <option value='Home furnishing'>Home furnishing</option>
            <option value='Hotel, Motel &amp; Lodging'>Hotel, Motel &amp; Lodging</option>
            <option value='Manufacturing'>Manufacturing</option>
            <option value='Laundry &amp; garment services'>Laundry &amp; garment services</option>
            <option value='Recreation'>Recreation</option>
            <option value='Retail store'>Retail store</option>
            <option value='Restaurant/Bar'>Restaurant/Bar</option>
            <option value='Travel &amp; transportation'>Travel &amp; transportation</option>
            <option value='Wholesale'>Wholesale</option>
            <option value='Veterinary clinic'>Veterinary clinic</option>
            <option value='Other'>Other</option>
          </select>
        </StyleWrapper>
      )
    } else {
      return (
        <div className='c-select is-locked' onClick={enableEdit}>
          <span>{label}</span>
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

export default ToggleCallbacks(IndustrySelect)
