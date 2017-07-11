import React from 'react'

export default function SearchForm ({ crumb }) {
  return (
    <div className='c-loan-reality-card__form-wrapper'>
      <form
        action='/loan-reality/bank-select'
        method='POST'
        className='c-loan-reality-card__item'>
        <input type='hidden' name='crumb' value={crumb} />
        <div className='form-container c-loan-reality-card__item'>
          <div className='_input-box c-loan-reality-card__item'>
            <input
              name='name'
              required
              type='text'
              placeholder='US Bank, Chase Bank, etc.'
              data-flex--item='full' />
            <label>Enter Your Bank Name</label>
          </div>
        </div>
        <div className='c-loan-reality-card__form-button-container'>
          <button
            type='submit'
            className='c-btn c-btn--l'
            onClick={track}>
            Search for Bank
          </button>
        </div>
      </form>
    </div>
  )
}

function track () {
  window.analytics.track('feature_click', {
    category: 'internal_link',
    label: 'search_for_bank',
    name: 'search_for_bank'
  })
}
