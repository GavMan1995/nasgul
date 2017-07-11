import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

export default function FicoHeader ({ hasFico }) {
  if (!hasFico) return null

  return (
    <div>
      <h1
        className='text-center'
        data-flex--item='p-l--3xl p-r--3xl'>
        See the score used by the SBA and
        7,500 other business lenders to underwrite business loans.
      </h1>

      <div data-flex--container='' data-flex--item='p--xl'>
        <div data-flex--item='basis--250 m-r--xl'>
          <CDNAsset directory='images' filename='fico-sbss-large.png' />
        </div>
        <div data-flex--item='basis--350 grow--1'>
          <p data-flex--item='full p-t--sm'>
            FICO LiquidCredit SBSS is calculated using a combination of your
            Experian personal and business credit reports. If your business
            doesn't yet have a credit report, FICO will use your personal
            credit report to generate the score.
          </p>
          <p data-flex--item='full p-t--lg'>
            This score is used by the U.S. Small Business Administration
            (SBA) and many commercial lenders in their loan underwriting
            process to determine a small business's creditworthiness.
          </p>
        </div>
      </div>
    </div>
  )
}
