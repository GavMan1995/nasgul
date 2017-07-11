import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import moment from 'moment'
import VMasker from 'vanilla-masker'

import CreditCardExpiration from './credit-card-expiration'
import CreditCardNumber from './credit-card-number'
import CreditCardVerification from './credit-card-verification'
import CreditCardZip from './credit-card-zip'
import DisplayPrice from './display-price'
import DisplayFinalPrice from './display-final-price'
import PrettyMoney from './pretty-money'
import FormCard from './form-card'
import FormCardButton from './form-card-button'
import IntervalToggleButton from './interval-toggle-button'

function _parseExpiration (string) {
  const pattern = /(\d{2})(\d{2})/

  if (pattern.test(string)) {
    const expiration = /(\d{2})(\d{2})/.exec(string)

    return { month: expiration[1], year: expiration[2] }
  } else {
    const expiration = string.split(' / ')

    return { month: expiration[0], year: expiration[1] }
  }
}

export default class PaymentForm extends Component {
  constructor (props) {
    super(props)

    let interval = 'quarterly'
    let planCode = this.props.targetPlan.plans.quarterly.planCode
    let showCouponCodeInput = false

    // handle coupon codes from links
    if (this.props.queryParams.offer) {
      interval = 'monthly'

      planCode = this.props.targetPlan.plans.monthly.planCode

    // set the interval if we came from a monthly change-plan link
    } else if (this.props.queryParams.frequency === 'monthly') {
      interval = 'monthly'
      planCode = this.props.targetPlan.plans.monthly.planCode
      showCouponCodeInput = true
    }

    this.state = {
      interval,
      planCode,
      showCouponCodeInput,
      coupon: null,
      cardType: 'unknown',
      currentCard: '_card-info',
      invalidFields: [],
      isProcessing: false,
      hasEngaged: false
    }
  }

  render () {
    const { me, targetPlan, address, crumb } = this.props
    const {
      interval,
      cardType,
      showCouponCodeInput,
      coupon,
      currentCard,
      invalidFields,
      isProcessing
    } = this.state

    let couponCodeInput

    if (showCouponCodeInput) {
      let currentClass = 'js-cc-coupon'
      if (invalidFields.indexOf('js-cc-coupon') > -1) {
        currentClass += ' -error'
      }
      couponCodeInput = (
        <input
          type='text'
          data-flex--item='full'
          className={currentClass}
          placeholder='Coupon Code'
          onFocus={(event) => this._resetInvalidField(event, 'js-cc-coupon')} />
      )
    }

    let discountDescription

    if (interval === 'monthly' && coupon && coupon.discount.rate && coupon.single_use) {
      discountDescription = (
        <small data-flex--item='full p--xs m-t--sm'>
          {coupon.discount.rate * 100}% discount applies only to first month. Plan cost thereafter is&nbsp;<PrettyMoney priceInCents={targetPlan.plans[interval].priceInCents} />&nbsp;per month.
        </small>
      )
    }

    if (interval === 'quarterly') {
      discountDescription = (
        <small data-flex--item='full p--xs m-t--sm'>
          {targetPlan.baseDiscountPercent}% discount applies only to first quarter. Plan cost thereafter is&nbsp;<PrettyMoney priceInCents={targetPlan.plans[interval].priceInCents} />&nbsp;per quarter.
        </small>
      )
    }

    let now = moment()
    // Opening and closing hours must be set in UTC
    let opening = moment.utc('14:00', 'HH:mm')
    let closing = moment.utc('24:00', 'HH:mm')
    let workingHours = now.isBetween(opening, closing)
    let weekends = now.isBetween(
      moment(now).isoWeekday(6).subtract(1, 'h'),
      moment(now).isoWeekday(7).add(1, 'h')
    )
    let errorMessaging, callUsText
    if (workingHours && !weekends) {
      callUsText = (
        <p>Call us now at <a href='tel:844-636-2445'>844-636-2445</a></p>
      )
    }
    if (invalidFields.length) {
      errorMessaging = (
        <div className='c-upgrade-form__call-agent-section'>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/customer-rep_198x176.svg'
            height='40' />
          <div className='c-upgrade-form__call-agent-copy'>
            <p><strong>Need Help? Talk to one of our agents.</strong></p>
            {callUsText}
          </div>
          <a
            href='https://calendly.com/navcustomersupport/upgradebilllingissues'
            target='_blank'
            onClick={this._trackCallAgent.bind(this)}
            className='c-btn c-btn--secondary c-btn--outline'>
            Schedule a Call
          </a>
        </div>
      )
    }

    return (
      <div data-flex--item='basis--400 grow--1'>
        <div
          data-flex--item='full'
          data-flex--container='all-grandchildren'
          className='simple-payment-form'>
          <div data-flex--item='full' className='_duration-toggle -seperate'>
            <IntervalToggleButton
              coupon={this.state.coupon}
              targetPlan={targetPlan}
              targetInterval='monthly'
              currentInterval={interval}
              onClick={this._toggleInterval.bind(this)} />

            <IntervalToggleButton
              targetPlan={targetPlan}
              targetInterval='quarterly'
              currentInterval={interval}
              onClick={this._toggleInterval.bind(this)} />
          </div>

          <div data-flex--item='full' className='_card-container'>
            <FormCard
              targetCard='_card-info'
              currentCard={currentCard}>
              <div data-flex--item='grow--1' className='_form-content'>
                <div data-flex--item='full p-t--sm p-b--md'>
                  <div
                    data-flex--item='full'
                    data-flex--container='nowrap row-items--middle'>
                    <div
                      data-flex--container='nowrap'
                      className='_premium-mark'>
                      <img
                        src={targetPlan.icon}
                        height='16' />
                      <span>Nav {targetPlan.description}</span>
                    </div>

                    <div
                      data-flex--item='basis--100 grow--1'
                      data-flex--container='right'
                      className='_plan-price'>
                      <div
                        data-flex--item='full'
                        data-flex--container='nowrap right'>
                        <DisplayPrice
                          targetPlan={targetPlan}
                          interval={interval}
                          coupon={coupon} />
                      </div>
                      <small>per {interval.slice(0, -2)}</small>
                    </div>
                  </div>
                </div>

                <form
                  data-flex--item='full'
                  className='js-card-info-form _card-form border--all'
                  noValidate>
                  <CreditCardNumber
                    cardType={cardType}
                    invalidFields={invalidFields}
                    onFocus={this._resetInvalidField.bind(this)}
                    onChange={this._ccNumberChange.bind(this)} />

                  <CreditCardExpiration
                    invalidFields={invalidFields}
                    onFocus={this._resetInvalidField.bind(this)} />

                  <CreditCardVerification
                    cardType={cardType}
                    invalidFields={invalidFields}
                    onFocus={this._resetInvalidField.bind(this)} />

                  {couponCodeInput}
                </form>

                {discountDescription}
              </div>

              <FormCardButton
                invalidFields={invalidFields}
                isProcessing={isProcessing}
                onClick={this._submitCardInfo.bind(this)}>
                Upgrade to {targetPlan.description}
              </FormCardButton>
            </FormCard>

            <FormCard
              targetCard='_billing-info'
              currentCard={currentCard}>
              <div
                data-flex--item='grow--1'
                data-flex--container='row-items--top'
                className='_form-content'>
                <form
                  data-flex--item='full m-t--sm'
                  className='js-billing-info-form _billing-info-form border--all'
                  noValidate>
                  <div data-flex--item='half'>
                    <input
                      type='text'
                      data-flex--item='full'
                      className='js-cc-first-name'
                      defaultValue={me.firstName}
                      placeholder='First Name' />
                  </div>

                  <div data-flex--item='half'>
                    <input
                      type='text'
                      data-flex--item='full'
                      className='js-cc-last-name'
                      defaultValue={me.lastName}
                      placeholder='Last Name' />
                  </div>

                  <div data-flex--item='full'>
                    <input
                      type='text'
                      data-flex--item='full'
                      className='js-cc-street1'
                      defaultValue={address.street1}
                      placeholder='Street Address' />
                  </div>

                  <div data-flex--item='basis--50 grow--4'>
                    <input
                      type='text'
                      data-flex--item='full'
                      className='js-cc-city'
                      defaultValue={address.city}
                      placeholder='City' />
                  </div>

                  <div data-flex--item='basis--50 grow--3'>
                    <input
                      type='text'
                      data-flex--item='full'
                      className='js-cc-state cc-state'
                      defaultValue={address.state}
                      placeholder='State'
                      maxLength='2' />
                  </div>

                  <CreditCardZip
                    defaultValue={address.zip}
                    invalidFields={invalidFields}
                    onFocus={this._resetInvalidField.bind(this)} />
                </form>
              </div>

              <FormCardButton
                invalidFields={invalidFields}
                isProcessing={isProcessing}
                onClick={(event) => this._submitBillingInfo(event, crumb)}>
                Make sure your billing info is correct
              </FormCardButton>
            </FormCard>

            <FormCard
              targetCard='_thanks-you'
              currentCard={currentCard}>
              <div
                data-flex--item='grow--1'
                data-flex--container='middle center'
                className='_form-content'>
                <div data-flex--item='basis--75'>
                  <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-gray.svg' />
                </div>

                <h2 data-flex--item='full'>
                  Welcome to {targetPlan.description}.
                </h2>
                <p data-flex--item='full'>
                  You will be charged <DisplayFinalPrice targetPlan={targetPlan} interval={interval} coupon={coupon} /> {interval} for your subscription. Enjoy all the new features.
                </p>
              </div>

              <button
                data-flex--item='grow--0'
                className='btn -round -secondary-1 _submit'
                onClick={this._showWelcomePage.bind(this)}>
                Check out your {targetPlan.description} Account
              </button>
            </FormCard>
          </div>
        </div>

        {errorMessaging}

        <div className='c-tax-disclaimer'>
          <small>
            Applicable sales tax will automatically be calculated and added for
            states that require it. By upgrading to Nav {targetPlan.description}
            , you will leave Nav's free service and enter Nav's paid service.
          </small>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.recurly.configure({
      publicKey: window.RECURLY_PUBLIC_KEY,
      cors: true
    })

    if (this.props.queryParams.offer) {
      window.recurly.coupon({
        plan: this.state.planCode,
        coupon: this.props.queryParams.offer
      }, (error, coupon) => {
        if (!error) {
          this.setState({ coupon })
        }
      })
    }

    VMasker(findDOMNode(this).querySelector('.js-cc-state')).maskPattern('AA')

    const form = findDOMNode(this).querySelector('.js-card-info-form')
    form.addEventListener('click', () => {
      if (!this.state.hasEngaged) {
        window.analytics.track(
          `Started Form (${this.props.offerName})`,
          {
            category: 'UpgradeOffer:Page',
            label: 'Upgrade Form',
            name: 'Upgrade Form'
          }
        )

        this.setState({ hasEngaged: true })
      }
    })
  }

  _toggleInterval (event) {
    const interval = event.currentTarget.getAttribute('data-plan-interval')
    const showCouponCodeInput = interval === 'monthly'
    const reportedInterval = interval.charAt(0).toUpperCase() + interval.slice(1)

    window.analytics.track(
      `Clicked Button (${this.props.offerName} Upgrade Page)`,
      {
        category: 'UpgradeOffer:Page',
        label: `Payment Frequency Toggle (${reportedInterval})`,
        name: `Payment Frequency Toggle (${reportedInterval})`
      }
    )

    this.setState({
      interval,
      showCouponCodeInput,
      planCode: this.props.targetPlan.plans[interval].planCode
    })
  }

  _ccNumberChange (event) {
    this.setState({
      cardType: window.recurly.validate.cardType(event.currentTarget.value)
    })
  }

  _submitCardInfo (event) {
    window.analytics.track(
      `Clicked Button (${this.props.offerName} Upgrade Page)`,
      {
        category: 'UpgradeOffer:Page',
        label: event.target.textContent.trim(),
        name: event.target.textContent.trim()
      }
    )

    const element = findDOMNode(this)
    const ccNumber = element.querySelector('.js-cc-number')
    const ccExpiration = element.querySelector('.js-cc-expiration')
    const ccVerification = element.querySelector('.js-cc-cvc')
    const couponCode = element.querySelector('.js-cc-coupon') ? element.querySelector('.js-cc-coupon').value : null

    const invalidFields = []

    if (!window.recurly.validate.cardNumber(ccNumber.value)) {
      Array.prototype.forEach.call(
        ccNumber.classList,
        (className) => {
          if (/^js-/.test(className)) {
            invalidFields.push(className)
          }
        }
      )
    }

    const { month, year } = _parseExpiration(ccExpiration.value)

    if (!window.recurly.validate.expiry(month, year)) {
      Array.prototype.forEach.call(
        ccExpiration.classList,
        (className) => {
          if (/^js-/.test(className)) {
            invalidFields.push(className)
          }
        }
      )
    }

    if (ccVerification.value.length !== ccVerification.maxLength) {
      Array.prototype.forEach.call(
        ccVerification.classList,
        (className) => {
          if (/^js-/.test(className)) {
            invalidFields.push(className)
          }
        }
      )
    }

    // validate coupon_code (if there is one entered)
    this._validateCouponCode(couponCode, (invalidField) => {
      if (invalidField) invalidFields.push(invalidField)

      // if there are errors, stop processing and display them
      if (invalidFields.length) {
        this.setState({ invalidFields })

      // no errors, move to the address info form
      } else {
        this.setState({ currentCard: '_billing-info' })
      }
    })
  }

  _validateCouponCode (coupon, callback) {
    let invalidField = ''

    if (coupon) {
      window.recurly.coupon({
        plan: this.state.planCode,
        coupon: coupon
      }, (error, coupon) => {
        if (error) {
          invalidField = 'js-cc-coupon'

          window.analytics.track(
            'Change Plan - Invalid Coupon Code',
            {
              plan: this.state.planCode,
              coupon: coupon,
              userId: this.props.me.email,
              category: 'ChangePlan:InvalidCoupon',
              action: 'ClickChangeMyPlanButton',
              label: 'Change Plan Upgrade Button',
              source: 'webapp'
            }
          )
        }
        this.setState({ coupon })
        callback(invalidField)
      })
    } else {
      callback(invalidField)
    }
  }

  _submitBillingInfo (event, crumb) {
    window.analytics.track(
      `Submitted Form (${this.props.offerName} Upgrade Page)`,
      {
        category: 'UpgradeOffer:Page',
        label: event.target.textContent.trim(),
        name: event.target.textContent.trim()
      }
    )

    this.setState({ isProcessing: true })

    const element = findDOMNode(this)
    const { month, year } = _parseExpiration(element.querySelector('.js-cc-expiration').value)

    // set and offer (coupon_code) if there is one
    let offer
    // a coupon_code input is present and has a value
    if (this.state.showCouponCodeInput && element.querySelector('.js-cc-coupon').value) {
      offer = element.querySelector('.js-cc-coupon').value

    // we got here from a link with a coupon_code
    } else if (this.state.interval !== 'quarterly' && this.props.queryParams.offer) {
      offer = this.props.queryParams.offer
    }

    const payload = {
      number: element.querySelector('.js-cc-number').value,
      month,
      year,
      cvv: element.querySelector('.js-cc-cvc').value,
      first_name: element.querySelector('.js-cc-first-name').value,
      last_name: element.querySelector('.js-cc-last-name').value,
      address1: element.querySelector('.js-cc-street1').value,
      city: element.querySelector('.js-cc-city').value,
      state: element.querySelector('.js-cc-state').value,
      postal_code: element.querySelector('.js-cc-zip').value,
      country: 'US'
    }

    window.recurly.token(payload, (error, token) => {
      if (error) {
        if (window.Bugsnag) window.Bugsnag.notify(error)

        this.setState({ isProcessing: false })

        if (error.code === 'invalid-parameter' && error.fields.indexOf('postal_code') > -1) {
          return this.setState({ invalidFields: ['js-cc-zip'] })
        } else {
          return this.setState({
            currentCard: '_card-info',
            invalidFields: ['js-cc-number']
          })
        }
      }

      window.fetch('/client/promos/premium_upgrade', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': crumb
        },
        credentials: 'include',
        body: JSON.stringify({
          token_id: token.id,
          plan_code: this.state.planCode,
          offer
        })
      }).then((response) => {
        if (response.ok) {
          this.setState({ currentCard: '_thanks-you' })
        } else {
          return response.json()
        }
      }).then((data) => {
        // TODO: Find better way to break out of promise on success
        if (!data) return

        this.setState({ isProcessing: false })

        const cardInfoFields = ['number', 'expiration', 'cvc']

        let targetCard = '_billing-info'

        if (cardInfoFields.indexOf(data.field) > -1) {
          targetCard = '_card-info'
        }

        this.setState({
          currentCard: targetCard,
          invalidFields: [`js-cc-${data.field}`]
        })
      })
    })
  }

  _resetInvalidField (event, targetField) {
    const { invalidFields } = this.state

    if (invalidFields.indexOf(targetField) > -1) {
      const fields = invalidFields.filter((field) => {
        return field !== targetField
      })

      this.setState({ invalidFields: fields })
    }
  }

  _trackCallAgent () {
    window.analytics.track('Button Click - Schedule A Call', {
      category: 'external link',
      label: 'Payment Form - Schedule A Call',
      name: 'Payment Form - Schedule A Call'
    })
  }

  _showWelcomePage (event) {
    window.analytics.track(
      `Clicked Button (${this.props.offerName} Upgrade Page)`,
      {
        category: 'UpgradeOffer:Page',
        label: event.target.textContent.trim(),
        name: event.target.textContent.trim()
      }
    )

    window.location.href = `${window.APP_BASE_URL}/app/welcome/${this.props.targetPlan.level}`
  }
}
