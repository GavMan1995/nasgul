import React from 'react'

export default function SearchBody ({ noInstitutionsFound }) {
  if (noInstitutionsFound) {
    return (
      <div>
        <h2 className='c-loan-reality-card__no-institutions-title--underline'>
          This could be because:
        </h2>
        <ul className='c-loan-reality-card__no-institutions-list'>
          <li>Bank name was typed incorrectly or partially.</li>
          <li>Your bank isn't associated with our service yet.</li>

          <p className='c-loan-reality-card__text'>
            <a href='tel:18552268388'>
              For help, or to report issues, call us at 1-855-226-8388
            </a>
          </p>
        </ul>
      </div>
    )
  }

  return null
}
