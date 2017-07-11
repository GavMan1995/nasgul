import React, { Component } from 'react'
import { connect } from 'react-redux'

import DefaultInput from '../../../../common/components/form/default-input'
import LoadingOverlay from '../../components/loading-overlay'
import PageWrapper from '../../components/page-wrapper'
import OwnedCheckbox from './owned-checkbox'

class BusinessInfoForm extends Component {
  constructor (props) {
    super(props)

    const isOwned = this.props.location.query.verify === 'true'

    this.state = {
      businessInfo: {
        name: '',
        isOwned,
        zip: ''
      },
      isLoading: false,
      invalidFields: []
    }
  }

  render () {
    const { businessInfo, isLoading, invalidFields } = this.state
    const { crumb, prompt, signupPlan } = this.props
    const isOwned = businessInfo.isOwned

    let skipLink = (
      <a
        href={prompt ? '/signup/upgrade' : '/dashboard'}
        className='c-btn c-add-business-flow__link'>
        Not right now
      </a>
    )
    if (signupPlan && signupPlan !== 'freemium') {
      skipLink = (
        <a
          href='/billing'
          className='c-btn c-add-business-flow__link'>
          Not right now
        </a>
      )
    }

    const inputClasses = {}

    inputClasses.name = ['c-input c-add-business-flow__input']

    if (businessInfo.name) inputClasses.name.push('is-filled')

    if (invalidFields.indexOf('name') > -1) inputClasses.name.push('has-error')

    inputClasses.name = inputClasses.name.join(' ')

    inputClasses.zip = ['c-input c-add-business-flow__input']

    if (businessInfo.zip) inputClasses.zip.push('is-filled')

    if (invalidFields.indexOf('zip') > -1) inputClasses.zip.push('has-error')

    inputClasses.zip = inputClasses.zip.join(' ')

    let errors = ''

    if (invalidFields.length > 0) {
      errors = (
        <p className='c-form-error-text'>
          Both business name and zip are required.
        </p>
      )
    }

    let loader = null

    if (isLoading) loader = <LoadingOverlay />

    return (
      <PageWrapper headerText='Tell Us About Your Business'>
        <form
          method='POST'
          action='/add-business'
          onSubmit={this.submitForm.bind(this)}
          noValidate
          className='c-add-business-flow__section'>
          <input type='hidden' name='crumb' value={crumb} />

          <p>
            We’ll use this information to find your business credit reports from
            Experian and Dun & Bradstreet.
          </p>

          {errors}
          <hr />

          <DefaultInput
            customClasses={inputClasses.name}
            label='Business Name'
            name='name'
            onChange={this.updateState.bind(this)}
            onFocus={this.clearErrors.bind(this)}
            value={businessInfo.name} />

          <DefaultInput
            customClasses={inputClasses.zip}
            label='Zip Code'
            maskType='zip'
            maxLength={5}
            name='zip'
            onChange={this.updateState.bind(this)}
            onFocus={this.clearErrors.bind(this)}
            value={businessInfo.zip} />

          <OwnedCheckbox
            isOwned={isOwned}
            isHidden={this.props.location.query.verify === 'true'}
            updateCheckbox={this.updateCheckbox.bind(this)} />

          <div className='c-add-business-flow__button-group'>
            {skipLink}
            <button
              className='c-btn c-btn--primary'
              type='submit'>
              Search for Reports
            </button>
          </div>

          {loader}
        </form>
      </PageWrapper>
    )
  }

  updateCheckbox (event) {
    const value = (event.target.value === 'true')
    const businessInfo = Object.assign({},
      this.state.businessInfo,
      {[event.target.name]: !value}
    )

    this.setState({businessInfo})
  }

  updateState (event) {
    const businessInfo = Object.assign({},
      this.state.businessInfo,
      {[event.target.name]: event.target.value}
    )

    this.setState({businessInfo})
  }

  validateFields (event) {
    const { name, zip } = this.state.businessInfo
    let invalidFields = []

    if (!name) invalidFields.push('name')
    if (!zip || zip.length !== 5) invalidFields.push('zip')

    if (invalidFields.length) this.setState({ invalidFields })

    return invalidFields.length
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

  submitForm (event) {
    window.analytics.track('Form Submit', {
      name: 'Initial Form',
      label: 'Initial Form',
      category: 'Add Business Interaction'
    })

    if (this.validateFields()) {
      event.preventDefault()
    } else {
      this.setState({ isLoading: true })
    }
  }

  componentDidMount () {
    const { businesses, plan } = this.props

    if (businesses.length >= plan.followedBusinessCount) {
      window.analytics.track('Not Eligible', {
        category: 'Add Business Interaction'
      })
    } else {
      window.analytics.track('Form Start', {
        name: 'Initial Form',
        label: 'Initial Form',
        category: 'Add Business Interaction'
      })
    }
  }
}

function mapStateToProps ({ crumb, businesses, location, plan, prompt, signupPlan }) {
  return { crumb, businesses, location, plan, prompt, signupPlan }
}

export default connect(mapStateToProps)(BusinessInfoForm)
