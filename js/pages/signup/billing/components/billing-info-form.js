import React, { Component } from 'react'
import { connect } from 'react-redux'

import DefaultInput from '../../../../common/components/form/default-input'
import LoadingOverlay from '../../components/loading-overlay'
import InputCreditCard from './input-credit-card'
import InputCVV from './input-cvv'
import SelectMonth from './select-month'
import SelectYear from './select-year'
import InputAddressAutoComlete from './input-address-autocomplete'
import SelectState from './select-state'
import InputZip from './input-zip'

class BillingInfoForm extends Component {
  constructor (props) {
    super(props)
    const { me } = this.props

    this.state = {
      billingInfo: {
        couponCode: '',
        creditCardNumber: '',
        cvv: '',
        city: '',
        expireMonth: '',
        expireYear: '',
        nameFirst: me.firstName || '',
        nameLast: me.lastName || '',
        state: '',
        street1: '',
        zip: ''
      },
      couponSuccess: '',
      hasAgreed: false,
      invalidFields: [],
      isLoading: false,
      tokenId: ''
    }
  }

  render () {
    const { crumb, selectedPlan } = this.props
    const {
      billingInfo,
      couponSuccess,
      hasAgreed,
      invalidFields,
      isLoading,
      tokenId } = this.state
    const {
      couponCode,
      creditCardNumber,
      cvv,
      city,
      expireMonth,
      expireYear,
      nameFirst,
      nameLast,
      state,
      street1,
      zip
    } = billingInfo

    let couponSuccessDisplay = null
    let couponErrors = null
    let errors = null

    if (couponSuccess) {
      couponSuccessDisplay = (
        <p>{couponSuccess}</p>
      )
    }

    if (invalidFields.indexOf('couponCode') > -1) {
      couponErrors = (
        <p className='c-signup-page__error-text'>
          Sorry, the coupon code you entered is invalid.
        </p>
      )
    }

    if (invalidFields.length) {
      errors = (
        <p className='c-signup-page__error-text'>
          Fix the indicated errors to continue.
        </p>
      )
    }

    let loader = (isLoading) ? <LoadingOverlay /> : null

    let checkboxClasses = ['c-signup-page__agree-checkbox']
    if (invalidFields.indexOf('hasAgreed') > -1) checkboxClasses.push('has-error')
    checkboxClasses = checkboxClasses.join(' ')

    return (
      <form
        method='POST'
        action='/billing'
        className='c-signup-page__form'
        onSubmit={this.submitForm.bind(this)}
        ref={(el) => { this.billingForm = el }}
        noValidate>

        <input type='hidden' name='crumb' value={crumb} />

        <input type='hidden' name='planCode' value={selectedPlan.planCode} />
        <input type='hidden' name='tokenId' value={tokenId} />

        <h5>Billing Info</h5>
        <InputCreditCard
          isInvalid={invalidFields.indexOf('creditCardNumber') > -1}
          label='Credit Card Number'
          name='creditCardNumber'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          value={creditCardNumber} />
        <InputCVV
          customBasis='80px'
          customClasses='c-signup-page__cvv-input'
          isInvalid={invalidFields.indexOf('cvv') > -1}
          label='CVV'
          name='cvv'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          value={cvv} />

        <h5>Expiration Date</h5>
        <div className='c-signup-page__input-group'>
          <SelectMonth
            isInvalid={invalidFields.indexOf('expireMonth') > -1}
            isForRecurly='true'
            label='MM'
            name='expireMonth'
            onFocus={this.clearErrors.bind(this)}
            onChange={this.updateBillingInfoState.bind(this)}
            value={expireMonth} />
          <SelectYear
            isInvalid={invalidFields.indexOf('expireYear') > -1}
            isForRecurly='true'
            label='YYYY'
            name='expireYear'
            onFocus={this.clearErrors.bind(this)}
            onChange={this.updateBillingInfoState.bind(this)}
            value={expireYear} />
        </div>

        <h5>Billing Address</h5>
        <DefaultInput
          customBasis='360px'
          isInvalid={invalidFields.indexOf('nameFirst') > -1}
          label='First Name'
          name='nameFirst'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          recurlyTag='first_name'
          value={nameFirst} />
        <DefaultInput
          customBasis='360px'
          isInvalid={invalidFields.indexOf('nameLast') > -1}
          label='Last Name'
          name='nameLast'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          recurlyTag='last_name'
          value={nameLast} />
        <InputAddressAutoComlete
          customBasis='100%'
          isInvalid={invalidFields.indexOf('street1') > -1}
          isForRecurly='true'
          label='Billing Address'
          name='street1'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          updateAddressState={this.updateAddressState.bind(this)}
          value={street1} />
        <DefaultInput
          isInvalid={invalidFields.indexOf('city') > -1}
          label='City'
          maskType='city'
          name='city'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          recurlyTag='city'
          value={city} />
        <SelectState
          isInvalid={invalidFields.indexOf('state') > -1}
          isForRecurly='true'
          label='State'
          name='state'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          value={state} />
        <InputZip
          isInvalid={invalidFields.indexOf('zip') > -1}
          isForRecurly='true'
          label='Zip'
          name='zip'
          onFocus={this.clearErrors.bind(this)}
          onChange={this.updateBillingInfoState.bind(this)}
          value={zip} />

        <div className='c-signup-page__coupon-section'>
          {couponSuccessDisplay}
          {couponErrors}
          <div className='c-signup-page__input-group'>
            <DefaultInput
              isInvalid={invalidFields.indexOf('couponCode') > -1}
              label='Coupon Code'
              name='couponCode'
              onFocus={this.clearErrors.bind(this)}
              onChange={this.updateBillingInfoState.bind(this)}
              value={couponCode} />
            <button onClick={this.applyCoupon.bind(this)}
              className='c-btn c-btn--outline'>
              Apply
            </button>
          </div>
        </div>

        <p className='c-signup-page__disclaimer-text'>
          <span className={checkboxClasses}>
            <input
              className='c-check c-check--secondary-2'
              id='is-owned'
              name='hasAgreed'
              type='checkbox'
              value={hasAgreed}
              onChange={this.updateCheckbox.bind(this)}
              onFocus={this.clearErrors.bind(this)} />
            <label htmlFor='hasAgreed' />
            <span>
              I agree to the&nbsp;
              <a href='https://www.nav.com/terms' target='_blank'>
                Terms and Conditons
              </a>
            </span>
          </span>
          I acknowledge receipt of Nav's Privacy and agree to its terms, and
          confirm my authorization for Nav, Inc. to obtain my credit score and
          report, charge my card and submit my secure order. Applicable sales tax will automatically be calculated and added for
          states that require it.
        </p>

        {errors}
        <hr />

        <button
          className='c-btn c-btn--primary c-signup-page__submit-btn'
          type='submit'>
          Continue
        </button>

        {loader}
      </form>
    )
  }

  componentDidMount () {
    window.recurly.configure({
      publicKey: window.RECURLY_PUBLIC_KEY,
      cors: true
    })
  }

  updateBillingInfoState (event) {
    const billingInfo = Object.assign({}, this.state.billingInfo, {
      [event.target.name]: event.target.value
    })

    this.setState({ billingInfo })
  }

  updateAddressState (addressValues) {
    this.setState({
      billingInfo: Object.assign({}, this.state.billingInfo, addressValues)
    })
  }

  updateCheckbox (event) {
    this.setState({ [event.target.name]: event.target.checked })
  }

  applyCoupon (event) {
    const { couponCode } = this.state.billingInfo
    const { planCode } = this.props.selectedPlan

    event.preventDefault()

    window.recurly.coupon({
      plan: planCode,
      coupon: couponCode
    }, (error, coupon) => {
      if (error) return this.setState({ invalidFields: ['couponCode'] })

      const successMessage = ['Your coupon was successfully applied!']

      if (coupon.single_use) {
        successMessage.push('This discount applies for one billing period.')
      } else if (coupon.applies_for_months) {
        successMessage.push(`This discount applies for ${coupon.applies_for_months} month(s)`)
      } else {
        successMessage.push('This discount applies for the life of the plan.')
      }

      this.props.updatePrice(coupon.discount.rate)
      this.setState({ couponSuccess: successMessage.join(' ') })
    })
  }

  validateForm () {
    const { billingInfo, hasAgreed } = this.state

    let invalidFields = []

    if (!hasAgreed) invalidFields.push('hasAgreed')

    Object.keys(billingInfo).forEach((field) => {
      const thisValue = billingInfo[field]

      // couponCode is not required
      if (field === 'couponCode') return

      if (!thisValue) {
        invalidFields.push(field)
      } else {
        if (field === 'zip' && thisValue.length !== 5) invalidFields.push(field)
        if (field === 'cvv' && thisValue.length < 3) invalidFields.push(field)
        if (field === 'creditCardNumber' && !window.recurly.validate.cardNumber(thisValue)) {
          invalidFields.push(field, 'validation')
        }
      }
    })

    if (invalidFields.length) {
      this.setState({ invalidFields, isLoading: false })

      window.analytics.track(
        'SignUp BillingInfo: Form Submit Incomplete Data',
        {
          userId: this.props.me.email,
          category: 'SignUp:billingInfo',
          action: 'Submit',
          label: 'Save Billing Info'
        }
      )
      return false
    }

    return true
  }

  submitForm (event) {
    event.preventDefault()

    this.setState({ isLoading: true })

    if (this.validateForm()) {
      const { billingInfo } = this.state
      const payload = {
        number: billingInfo.creditCardNumber,
        month: billingInfo.expireMonth,
        year: billingInfo.expireYear,
        cvv: billingInfo.cvv,
        first_name: billingInfo.nameFirst,
        last_name: billingInfo.nameLast,
        address1: billingInfo.street1,
        city: billingInfo.city,
        state: billingInfo.state,
        postal_code: billingInfo.zip,
        country: 'US'
      }

      window.recurly.token(payload, (error, token) => {
        if (error || !token) {
          if (window.Bugsnag) window.Bugsnag.notify(error)

          this.setState({ isLoading: false })

          if (error.code === 'validation') {
            return this.setState({ invalidFields: ['validation'] })
          }
        }

        this.setState({ tokenId: token.id }, () => {
          this.billingForm.submit()
        })
      })
    }
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
}

function mapStateToProps ({ crumb }) {
  return { crumb }
}

module.exports = exports.default = connect(mapStateToProps)(BillingInfoForm)
module.exports.jsFilename = 'billing'
