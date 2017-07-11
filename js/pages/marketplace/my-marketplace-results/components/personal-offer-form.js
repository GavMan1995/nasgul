import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import moment from 'moment'
import VMasker from 'vanilla-masker'

import trackClick from '../../track-click'

class PersonalOfferForm extends Component {
  constructor (props) {
    super(props)

    const { business, location } = props

    let monthlyRevenue = 0

    if (business !== undefined && business.financials !== undefined) {
      monthlyRevenue = Math.floor(business.financials.annualGrossRevenue / 12)
    }

    if (location.query.monthlyRevenue) {
      monthlyRevenue = location.query.monthlyRevenue.replace(/\D/g, '')
    }

    monthlyRevenue = VMasker.toMoney(monthlyRevenue, {
      precision: 0,
      delimiter: ',',
      unit: '$'
    })

    let startDate

    if (business !== undefined &&
        business.details !== undefined &&
        business.details.startDate !== 'Invalid date') {
      startDate = business.details.startDate
    }

    if (location.query.startDate) {
      startDate = VMasker.toPattern(location.query.startDate, '99-99-9999')
    }

    let splitDate, startMonth, startDay, startYear

    if (startDate) {
      splitDate = startDate.split('-')
      startMonth = splitDate[0]
      startDay = splitDate[1]
      startYear = splitDate[2]
    }

    this.state = {
      invalidFields: [],
      loanAmount: location.query.loanAmount,
      loanSpeed: location.query.loanSpeed,
      monthlyRevenue: monthlyRevenue,
      startedBusiness: false,
      startDate: startDate,
      day: startDay,
      month: startMonth,
      year: startYear
    }
  }

  render () {
    const {
      invalidFields,
      loanAmount,
      loanSpeed,
      monthlyRevenue,
      startedBusiness,
      startDate,
      month,
      year
    } = this.state

    const { marketplaceOptions, toggleFilter } = this.props

    const speedTrait = marketplaceOptions.traits.filter((trait) => {
      return trait.name === 'Funding Speed'
    })[0]
    const loanAmountTrait = marketplaceOptions.traits.filter((trait) => {
      return trait.name === 'Loan Amount'
    })[0]

    // define the form input classes and adjust for errors and error text
    const classes = {}
    let errorText = ''

    classes.loanAmount = ['c-select']
    if (loanAmount) classes.loanAmount.push('is-filled')
    if (invalidFields.indexOf('loanAmount') > -1) {
      classes.loanAmount.push('has-error')
      errorText = 'Loan Speed and Amount fields are required.'
    }
    classes.loanAmount = classes.loanAmount.join(' ')

    classes.loanSpeed = ['c-select']
    if (loanSpeed) classes.loanSpeed.push('is-filled')
    if (invalidFields.indexOf('loanSpeed') > -1) {
      classes.loanSpeed.push('has-error')
      errorText = 'Loan Speed and Amount fields are required.'
    }
    classes.loanSpeed = classes.loanSpeed.join(' ')

    classes.monthlyRevenue = ['c-input']
    if (monthlyRevenue) classes.monthlyRevenue.push('is-filled')
    if (invalidFields.indexOf('monthlyRevenue') > -1) classes.monthlyRevenue.push('has-error')
    classes.monthlyRevenue = classes.monthlyRevenue.join(' ')

    classes.startDateMonth = ['c-select', 'c-select--small']
    if (month) classes.startDateMonth.push('is-filled')
    if (!month) classes.startDateMonth.push('has-no-value')
    if (invalidFields.indexOf('startMonth') > -1) {
      classes.startDateMonth.push('has-error')
      errorText = 'Month Required'
    }
    classes.startDateMonth = classes.startDateMonth.join(' ')

    classes.startDateYear = ['c-select', 'c-select--small']
    if (year) classes.startDateYear.push('is-filled')
    if (!year) classes.startDateYear.push('has-no-value')
    if (invalidFields.indexOf('startYear') > -1) {
      classes.startDateYear.push('has-error')
      errorText = 'Year Required'
    }
    classes.startDateYear = classes.startDateYear.join(' ')

    let errors = ''
    if (invalidFields.length > 0) {
      errors = (
        <p className='c-form-error-text'>
          {errorText}
        </p>
      )
    }

    return (
      <form
        name='personalOfferFilter'
        action='/financing-options/results'>
        {errors}

        <div className='c-aside-filter__form-group'>
          <div className={classes.loanSpeed}>
            <select
              name='loanSpeed'
              value={this.state.loanSpeed}
              onChange={this.updateState.bind(this)}
              onFocus={this.clearErrors.bind(this)}>
              <option value='' hidden>Select one</option>
              {speedTrait.options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )
              })}
            </select>
            <label>Loan Speed</label>
          </div>

          <div className={classes.loanAmount}>
            <select
              name='loanAmount'
              value={this.state.loanAmount}
              onChange={this.updateState.bind(this)}
              onFocus={this.clearErrors.bind(this)}>
              <option value='' hidden>Select one</option>
              {loanAmountTrait.options.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )
              })}
            </select>
            <label>Loan Amount</label>
          </div>

        </div>
        <div className='c-aside-filter__form-group c-aside-filter__form-group--secondary'>
          <div
            className={classes.monthlyRevenue}>
            <input
              name='monthlyRevenue'
              placeholder='$__'
              value={this.state.monthlyRevenue}
              onChange={this.updateState.bind(this)}
              onFocus={this.clearErrors.bind(this)} />
            <label>Monthly Revenue</label>
          </div>

          <small>Business Start Date</small>
          <div className={classes.startDateMonth}>
            <select
              name='month'
              value={this.state.month}
              onChange={this.updateDate.bind(this)}
              onFocus={this.clearErrors.bind(this)}>
              <option value='' hidden>MM</option>
              {monthOptions(12)}
            </select>
            <label>Month</label>
          </div>

          <div className={classes.startDateYear}>
            <select
              name='year'
              value={this.state.year}
              onChange={this.updateDate.bind(this)}
              onFocus={this.clearErrors.bind(this)}>
              <option value='' hidden>YYYY</option>
              {yearOptions(100)}
            </select>
            <label>Year</label>
          </div>

          <input type='hidden' name='startDate' value={startDate} />
          <div className='c-form-help-text'>
            <input
              id='started-business'
              name='startedBusiness'
              className='check'
              type='checkbox'
              checked={startedBusiness}
              onChange={this.toggleBusinessStarted.bind(this)} />
            <label htmlFor='started-business' />
            <p>I haven't started my business yet</p>
          </div>
          <div className='c-aside-filter__form-btn'>
            <button
              className='c-btn c-btn--secondary c-btn--sm'
              type='button'
              onClick={toggleFilter}>
              Close Filter
            </button>
            <button
              className='c-btn c-btn--primary c-btn--sm'
              type='submit'
              onClick={this.submitForm.bind(this)}
              onFocus={this.clearErrors.bind(this)}>
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </form>
    )
  }

  componentDidUpdate () {
    const monthlyRevenue = findDOMNode(this).querySelector('input[name=monthlyRevenue]')

    VMasker(monthlyRevenue).maskMoney({
      precision: 0,
      separator: '.',
      delimiter: ',',
      unit: '$'
    })
  }

  closeFilter (event) {
    event.preventDefault()

    this.setState({ filterClosed: true })
  }

  updateState (event) {
    let stateChange = {}

    stateChange[event.target.name] = event.target.value

    this.setState(stateChange)
  }

  updateDate (event) {
    let stateChange = {}

    stateChange[event.target.name] = event.target.value

    this.setState(stateChange,
      () => {
        const { month, year } = this.state

        let newDate = {}

        if (month && year) {
          newDate['startDate'] = `${month}-01-${year}`

          this.setState(newDate)
        }
      }
    )
  }

  toggleBusinessStarted (event) {
    this.setState({ startedBusiness: !this.state.startedBusiness })
  }

  submitProfile (event) {
    const business = this.props.business

    if (Object.keys(business).length < 1) return

    const guid = business.details.guid

    if (guid !== '') {
      const { startDate } = this.state
      const monthlyRevenue = findDOMNode(this).querySelector('input[name=monthlyRevenue]')
      const date = moment(startDate, 'MM-DD-YYYY', true)
      const textDate = date.isValid() ? date.format('YYYY-MM-DD') : null
      const rev = monthlyRevenue.value.replace(/\D/g, '') * 12

      let params = {
        update_values: {
          start_date: textDate,
          annual_gross_revenue: rev !== '' ? rev : null
        }
      }

      window.fetch(`/client/api/v3/business_profiles/${guid}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'x-csrf-token': this.props.crumb
        },
        body: JSON.stringify(params),
        credentials: 'include'
      }).then((response) => {
        return true
      }).catch((error) => {
        console.log('error', error)
        return true
      })
    }

    return true
  }

  formNotValid () {
    const { loanSpeed, loanAmount, startDate, month, year } = this.state

    let invalidFields = []

    if (loanSpeed === undefined || loanSpeed === '') {
      invalidFields.push('loanSpeed')
    }

    if (loanAmount === undefined || loanAmount === '') {
      invalidFields.push('loanAmount')
    }

    if (month || year) {
      if (!startDate) {
        invalidFields.push('startDate')
      }
    }
    if (startDate && !moment(startDate, 'MM-DD-YYYY', true).isValid()) {
      invalidFields.push('startDate')
    }

    if (invalidFields.length) {
      this.setState({ invalidFields })
    }

    return invalidFields.length
  }

  clearErrors (event) {
    const { invalidFields } = this.state

    let targetField = event.target.name

    if (targetField === 'month' || targetField === 'year') {
      targetField = 'startDate'
    }

    if (invalidFields.indexOf(targetField) > -1) {
      const fields = invalidFields.filter((field) => {
        return field !== targetField
      })
      this.setState({ invalidFields: fields })
    }
  }

  submitForm (event) {
    event.preventDefault()

    if (this.formNotValid()) {
      trackClick(
        'Marketplace Form',
        'Feature Click',
        'Display Results Failed - Lending'
      )
      return false
    }

    if (this.props.business && (this.state.startDate || this.state.monthlyRevenue)) {
      this.submitProfile()
    }

    this.trackFormSubmission(`${this.props.buttonText} Results - Lending`)

    document.personalOfferFilter.submit()
  }

  trackFormSubmission (name) {
    trackClick(
      'Marketplace Form',
      'Feature Click',
      name,
      {
        LoanSpeed: this.state.loanSpeed,
        LoanAmount: this.state.loanAmount,
        startedBusiness: this.state.startedBusiness
      }
    )
  }
}

function monthOptions (qty) {
  let options = []

  for (let i = 1; i <= qty; i++) {
    const display = (i < 10) ? `0${i}` : i

    options.push(<option key={Math.random()} value={display}>{display}</option>)
  }

  return options
}

function yearOptions (dateOptions) {
  const thisYear = new Date().getFullYear()
  const startYear = thisYear - dateOptions
  let options = []

  for (let i = thisYear; i >= startYear; i--) {
    options.push(<option key={Math.random()} value={i}>{i}</option>)
  }

  return options
}

function mapStateToProps ({ crumb, marketplaceOptions, location }) {
  return { crumb, marketplaceOptions, location }
}

export default connect(mapStateToProps)(PersonalOfferForm)
