import React, { Component } from 'react'

import DefaultInput from '../../../../common/components/form/default-input'
import DefaultSelect from '../../../../common/components/form/default-select'

export default class IdentificationForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      idInfo: {
        ssn: '',
        month: '',
        day: '',
        year: ''
      },
      invalidFields: []
    }
  }

  render () {
    const { idInfo, invalidFields } = this.state
    const { ssn, month, day, year } = idInfo
    const { crumb, me } = this.props

    let errors

    if (invalidFields.length) {
      errors = (
        <p className='c-signup-page__error-text'>
          All fields are required. Please fix the indicated errors to continue.
        </p>
      )
    }

    let submitButtonClass = 'c-btn c-btn--primary c-signup-page__submit-btn'

    if (ssn && month && day && year) {
      submitButtonClass = 'c-btn c-btn--primary c-signup-page__submit-btn is-shown'
    }

    return (
      <form
        method='POST'
        action='/identification'
        className='c-signup-page__form'
        onSubmit={this.validateIdentification.bind(this)}
        noValidate>
        <input type='hidden' name='crumb' value={crumb} />
        <input type='hidden' name='phone' value={me.phoneNumber} />

        <div className='c-signup-page__max-width-container'>
          <DefaultInput
            customClasses='c-signup-page__ssn-input'
            isInvalid={invalidFields.indexOf('ssn') > -1}
            hasValue={ssn}
            label='Social Security Number*'
            maskType='ssn'
            maxLength={11}
            name='ssn'
            onChange={this.updateIdentificationState.bind(this)}
            onFocus={this.clearErrors.bind(this)}
            value={ssn} />

          <h5>Birth Date*</h5>
          <div className='c-signup-page__select-group'>
            <DefaultSelect
              isInvalid={invalidFields.indexOf('month') > -1}
              hasValue={month}
              label='MM'
              name='month'
              onChange={this.updateIdentificationState.bind(this)}
              onFocus={this.clearErrors.bind(this)}
              type='month'
              value={month} />

            <DefaultSelect
              isInvalid={invalidFields.indexOf('day') > -1}
              hasValue={day}
              label='DD'
              name='day'
              onChange={this.updateIdentificationState.bind(this)}
              onFocus={this.clearErrors.bind(this)}
              type='day'
              value={day} />

            <DefaultSelect
              isInvalid={invalidFields.indexOf('year') > -1}
              hasValue={year}
              label='YYYY'
              name='year'
              onChange={this.updateIdentificationState.bind(this)}
              onFocus={this.clearErrors.bind(this)}
              type='year'
              value={year} />
          </div>

          <p className='c-signup-page__info-text'>
            <strong>That's it!</strong> Now we just need to verify your identity.
            To do this, you'll be asked a few questions related to your credit data.
          </p>

          {errors}

          <button
            className={submitButtonClass}
            type='submit'>
            Continue
          </button>
        </div>
      </form>
    )
  }

  // Server-side validation does not work fully, so we need to compensate
  validateIdentification (event) {
    const { idInfo } = this.state
    let invalidFields = []

    Object.keys(idInfo).forEach((field) => {
      let thisValue = idInfo[field]

      // Handle required fields
      if (!thisValue) {
        invalidFields.push(field)
      } else {
        // enforce 11 characters, masker will allow submission of less
        if (field === 'ssn') {
          if (thisValue.length !== 11) invalidFields.push(field)
        }
      }

      if (invalidFields.length) {
        event.preventDefault()

        this.setState({ invalidFields })

        // TODO: update when BI tells us what they want
        window.analytics.track(
          'SignUp Identification: Form Submit Incomplete Data',
          {
            userId: this.props.me.email,
            category: 'SignUp:Identification',
            action: 'Submit',
            label: 'Save Identification Info'
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

  updateIdentificationState (event) {
    const idInfo = Object.assign({},
      this.state.idInfo,
      { [event.target.name]: event.target.value }
    )

    this.setState({ idInfo })
  }
}
