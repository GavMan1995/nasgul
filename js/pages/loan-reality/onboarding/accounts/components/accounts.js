import React from 'react'

export default function Accounts ({ accounts }) {
  return (
    <div className='c-loan-reality-container'>
      <div className='c-card c-loan-reality-card'>
        <h2 className='c-loan-reality-card__title--bold'>
          It looks like you have more than one account.

          <p className='c-loan-reality-card__subtitle'>
            Which one is your main business account?
          </p>
        </h2>
        <div className='c-loan-reality__institution-container' >
          {accounts.map((account, index) => {
            const { attributes, id } = account

            return (
              <div
                key={index}
                className='c-loan-reality__institution-wrapper'>
                <a href={`/loan-reality/analyzing?accountId=${id}`}>
                  <div className='c-loan-reality__institution-name'>
                    {attributes.name}
                  </div>
                </a>
                <div className='c-loan-reality__arrow-right-container' >
                  <div className='c-loan-reality__arrow-right'>
                    <span />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='c-loan-reality-card__answer-error' />
      </div>
    </div>
  )
}
