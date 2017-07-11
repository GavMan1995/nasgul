import React from 'react'

import trackClick from '../../track-click'

import PersonalOfferForm from './personal-offer-form'

export default function FormSection (props) {
  const {
    businessDetails,
    filterClosed,
    formHeight,
    location,
    toggleFilter
  } = props

  let addBusinessBtn = null

  if (businessDetails.length === 0) {
    addBusinessBtn = (
      <div className='c-aside-filter__form-header-btn'>
        <a
          href='/app/add_business'
          className='c-btn c-btn--primary c-btn--outline'
          onClick={() => trackFeatureClick('Add a Business - Lending')}>
          Add a Business
        </a>
      </div>
    )
  }

  return (
    <aside className='c-aside-filter-container'>
      <div className='c-aside-filter js-aside-filter'>
        <div
          className='c-aside-filter__form'
          style={{ maxHeight: `${!filterClosed ? formHeight : 0}px` }}>
          <div className='c-aside-filter__form-header'>
            <h3>
              <strong>Filter loan results for:&nbsp;</strong>
              {`${businessDetails.length > 0 ? businessDetails[0].name : ''}`}
            </h3>
            {addBusinessBtn}
          </div>
          <PersonalOfferForm
            buttonText='Update Results'
            business={businessDetails[0]}
            toggleFilter={toggleFilter} />
        </div>

        <div
          className='c-aside-filter__collapsed-section'
          style={{ display: filterClosed ? 'flex' : 'none' }}>
          <div className='c-aside-filter__collapsed-section-content'>
            <strong>Loan Criteria</strong>
            <h5>
              {location.query.loanSpeed}, {location.query.loanAmount}
            </h5>
          </div>
          <button
            className='c-btn c-btn--primary c-btn--sm'
            onClick={toggleFilter}>
            Refine Search
          </button>
        </div>
      </div>
    </aside>
  )
}

function trackFeatureClick (name) {
  trackClick(
    'Marketplace Results',
    'Feature Click',
    name
  )
}
