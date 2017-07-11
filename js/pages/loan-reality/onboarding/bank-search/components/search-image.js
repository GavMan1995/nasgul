import React from 'react'
import CDNAsset from '../../../../../common/components/cdn-asset'

export default function SearchBody ({ noInstitutionsFound }) {
  if (noInstitutionsFound) {
    return (
      <h1 className='c-loan-reality-card__search-again-title'>
        <CDNAsset
          className='c-loan-reality-card__small-image--left-align'
          directory='images/loan-reality'
          filename='bank.svg' />
        Search Again
      </h1>
    )
  }

  return (
    <CDNAsset
      className='c-loan-reality-card__small-image'
      directory='images/loan-reality'
      filename='bank.svg' />
  )
}
