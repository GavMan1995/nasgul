import React from 'react'

export default function Account ({ account }) {
  const { id } = account
  const { name } = account.attributes

  let accountLink = (
    <a href={`/loan-reality/bank-account/delete?accountId=${id}`}>
      Remove
    </a>
  )

  let reportLink = (
    <a href={`/loan-reality/analyzing?accountId=${id}`}>View Report</a>
  )

  if (account.status === 'HIDDEN') {
    accountLink = (
      <a href={`/loan-reality/bank-account/activate?accountId=${id}`}>
        Attach
      </a>
    )

    reportLink = null
  }

  return (
    <div className='c-loan-reality-card__settings-account'>
      <h4 className='c-loan-reality-card__settings-title'>{name}</h4>
      <div className='c-loan-reality-card__settings-link'>
        {reportLink}
      </div>
      <div className='c-loan-reality-card__settings-link'>
        {accountLink}
      </div>
    </div>
  )
}
