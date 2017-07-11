import React, { Component } from 'react'

import IndustrySelect from './industry-select'
import LegalEntitySelect from './legal-entity-select'
import StartDateInput from './start-date-input'
import YesNoSelect from '../../components/yes-no-select'
import LoadingOverlay from '../../components/loading-overlay'

export default class BusinessProfileForm extends Component {
  constructor () {
    super()
    this.state = {
      canEdit: false,
      isLoading: false
    }
  }
  render () {
    const { increment, decrement, crumb, ownedProfiles } = this.props
    const { canEdit, isLoading } = this.state

    let formButton = (
      <button
        type='button'
        className='c-btn c-btn--primary'
        id='businessDetailsSave'
        onClick={this.enableEdit.bind(this)}>
        Edit
      </button>
    )
    if (canEdit) {
      formButton = (
        <button
          type='submit'
          className='c-btn c-btn--primary'
          id='businessDetailsSave'>
          Save Changes
        </button>
      )
    }

    let loader = null
    if (isLoading) {
      loader = <LoadingOverlay />
    }

    return (
      <form
        data-flex--item='basis--500 grow--5'
        data-flex--container='row-items--top'
        className='_profile-section'
        onSubmit={this.submitForm.bind(this)}
        action='/app/profile/business'
        method='POST'>
        <input type='hidden' name='crumb' value={crumb} />
        {ownedProfiles.map((business, index) => {
          return (
            <div
              data-flex--item='full m-b--xl'
              className='form-container'
              key={index}>
              <input
                type='hidden'
                name={`business_${index}_guid`}
                value={business.details.guid} />

              <div data-flex--item='full p--sm' className='_section-header'>
                Business Information for {business.name}
              </div>

              <div data-flex--container data-flex--item='full p-x--md'>
                <StartDateInput
                  name={`business_${index}_start_date`}
                  canEdit={canEdit}
                  defaultValue={business.details.startDate}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Business Start Date' />

                <LegalEntitySelect
                  name={`business_${index}_legal_entity`}
                  canEdit={canEdit}
                  defaultValue={business.details.legalEntity}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Legal Entity' />

                <IndustrySelect
                  name={`business_${index}_industry`}
                  canEdit={canEdit}
                  defaultValue={business.details.industry}
                  enableEdit={this.enableEdit.bind(this)}
                  increment={increment}
                  decrement={decrement}
                  label='Industry' />

                <YesNoSelect
                  canEdit={canEdit}
                  defaultValue={business.financials.invoiced}
                  enableEdit={this.enableEdit.bind(this)}
                  name={`business_${index}_invoiced`}
                  label='Is the majority of your revenue invoiced?' />

                <YesNoSelect
                  canEdit={canEdit}
                  defaultValue={business.details.registeredEnity}
                  enableEdit={this.enableEdit.bind(this)}
                  name={`business_${index}_registered_entity`}
                  label='Registered as a legal entity?' />
              </div>

              {loader}
            </div>
          )
        })}

        <div
          data-flex--item='full'
          data-flex--container='right'>
          {formButton}
        </div>

      </form>
    )
  }

  enableEdit (event) {
    event.preventDefault()
    this.setState({ canEdit: true })
  }

  submitForm () {
    this.setState({ isLoading: true })
    window.analytics.track('Form Submit', {
      name: 'business_details',
      label: 'business_details',
      category: 'Profile Interaction'
    })
  }
}
