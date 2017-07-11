import React from 'react'

import CDNLogo from '../../../../common/components/cdn-logo'

export default function Footer () {
  return (
    <div className='c-signup-page__footer'>
      <p>
        Like other credit scores offered to consumers, the credit score Nav
        provides is the Vantage 3.0 score and is not likely to be the same
        score used by lenders or other commercial users for credit decisions.
        There are various types of credit scores, and lenders use a variety of
        different types of credit scores to make lending decisions.
      </p>
      <p>
        You understand that by clicking “Continue”, you are providing
        'written instructions' to Nav authorizing Nav to obtain information
        from your personal credit profile from Experian and/or TransUnion.
        You authorize Nav to obtain such information solely to confirm your
        identity and display your credit data to you.
      </p>
      <div className='c-signup-page__bureau-icons'>
        <CDNLogo filename='experian.svg' />
        <CDNLogo filename='transunion_181x48.png' />
        <CDNLogo filename='dandb_328x48.png' />
        <CDNLogo filename='fico_134x48.png' />
      </div>
    </div>
  )
}
