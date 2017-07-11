import React, { Component } from 'react'

import DefaultInput from '../../../../common/components/form/default-input'
import DefaultSelect from '../../../../common/components/form/default-select'

export default class PersonalInfoForm extends Component {
  constructor (props) {
    super(props)

    const { address, me } = props

    this.state = {
      invalidFields: [],
      personalInfo: {
        firstName: me.firstName || '',
        lastName: me.lastName || '',
        street1: address.street1 || '',
        city: address.city || '',
        state: address.state || '',
        zip: address.zip || '',
        phone: me.phoneNumber || ''
      }
    }
  }

  render () {
    const { invalidFields, personalInfo } = this.state
    const { firstName, lastName, street1, city, state, zip, phone } = personalInfo
    const { crumb } = this.props

    let errors
    if (invalidFields.length) {
      errors = (
        <p className='c-signup-page__error-text'>
          All fields are required. Please fix the indicated errors to continue.
        </p>
      )
    }

    return (
      <form
        method='POST'
        action='/personal-info'
        className='c-signup-page__form'
        onSubmit={this.validatePersonalInfo.bind(this)}
        noValidate>
        <input type='hidden' name='crumb' value={crumb} />

        <DefaultInput
          isInvalid={invalidFields.indexOf('firstName') > -1}
          hasValue={firstName}
          label='First Name*'
          name='firstName'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          value={firstName} />

        <DefaultInput
          isInvalid={invalidFields.indexOf('lastName') > -1}
          hasValue={lastName}
          label='Last Name*'
          name='lastName'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          value={lastName} />

        <DefaultInput
          customBasis='100%'
          isInvalid={invalidFields.indexOf('street1') > -1}
          hasValue={street1}
          label='Home Address*'
          type='address'
          name='street1'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          updateAddressState={this.updateAddressState.bind(this)}
          value={street1} />

        <DefaultInput
          customBasis='400px'
          isInvalid={invalidFields.indexOf('city') > -1}
          hasValue={city}
          label='City*'
          name='city'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          value={city} />

        <DefaultSelect
          customBasis='150px'
          isInvalid={invalidFields.indexOf('state') > -1}
          hasValue={state}
          label='State*'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          type='state'
          value={state} />

        <DefaultInput
          customBasis='150px'
          isInvalid={invalidFields.indexOf('zip') > -1}
          hasValue={zip}
          label='Zip*'
          maskType='zip'
          maxLength={5}
          name='zip'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          value={zip} />

        <DefaultInput
          isInvalid={invalidFields.indexOf('phone') > -1}
          hasValue={phone}
          label='Phone*'
          maskType='phone'
          maxLength={12}
          name='phone'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updatePersonalInfoState.bind(this)}
          value={phone} />

        <p className='c-signup-page__disclaimer-text'>
          Your personal information will only be used to give you access
          to your credit data and will not be sold to 3rd parties.
        </p>

        {errors}
        <hr />

        <button
          className='c-btn c-btn--primary c-signup-page__submit-btn'
          type='submit'>
          Continue
        </button>
      </form>
    )
  }

  // Server-side validation does not work fully, so we need to compensate
  validatePersonalInfo (event) {
    const { personalInfo } = this.state
    let invalidFields = []

    Object.keys(personalInfo).forEach((field) => {
      // Street2 is not required
      if (field === 'street2') return

      let thisValue = personalInfo[field]

      // Handle required fields
      if (!thisValue) {
        invalidFields.push(field)
      } else {
        switch (field) {
          case 'zip':
            // enforce 5 characters, masker will allow submission of less
            if (thisValue.length !== 5) invalidFields.push(field)
            break
          case 'phone':
            // enforce phone number, either 999-999-9999 or 9999999999
            if (!/^\d{3}-?\d{3}-?\d{4}$/.test(thisValue)) invalidFields.push(field)
            break
          case 'ssn':
            // enforce 11 characters, masker will allow submission of less
            if (thisValue.length !== 11) invalidFields.push(field)
            break
        }
      }

      if (invalidFields.length) {
        event.preventDefault()

        this.setState({ invalidFields })

        // TODO: update when BI tells us what they want
        window.analytics.track(
          'SignUp PersonalInfo: Form Submit Incomplete Data',
          {
            userId: this.props.me.email,
            category: 'SignUp:PersonalInfo',
            action: 'Submit',
            label: 'Save Personal Info'
          }
        )
      }
    })
  }

  clearErrors (event) {
    const { invalidFields } = this.state
    const targetField = event.target.name

    if (invalidFields.indexOf(targetField) > -1) {
      const fields = invalidFields.filter((field) => {
        return field !== targetField
      })

      this.setState({ invalidFields: fields })
    }
  }

  updatePersonalInfoState (event) {
    const personalInfo = Object.assign({}, this.state.personalInfo, {
      [event.target.name]: event.target.value
    })

    this.setState({ personalInfo })
  }

  updateAddressState (addressValues) {
    this.setState({
      personalInfo: Object.assign({}, this.state.personalInfo, addressValues)
    })
  }
}
