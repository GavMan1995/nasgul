import React from 'react'

export default function GoalCalloutSection ({ tools }) {
  let component = null

  if (!tools.credit_target_total || tools.credit_target_total === 0) {
    component = (
      <section className='o-card c-callout-card c-callout-card--goal'>
        <div className='c-callout-card__info'>
          <div className='c-callout-card__header'>
            <h1>Start Here</h1>
          </div>
          <h3>Get the most out of Nav by setting a goal.</h3>
          <p>You can work on up to 3 goals at a time.</p>
        </div>

        <div className='c-callout-card__btn-container'>
          <a
            href='/build/credit-target'
            className='c-btn c-btn--xl c-btn--white'>
            Set a Goal
          </a>
        </div>
      </section>
    )
  }

  return component
}
