import React from 'react'

import CDNIcon from '../../../../common/components/cdn-icon'

export default function PremiumPromo (props) {
  if (!props.premiumPromo) return null

  return (
    <div>
      <div className='c-signup-premium-cta'>
        <div className='c-signup-premium-cta__header'>
          <h3>
            Nav Premium: Get Your Business Ready for Funding Fast
          </h3>
          <p>
            Our best account to make sure things are smooth when you need
            financing
          </p>
        </div>

        <div className='c-signup-premium__img-container'>
          <div className='c-signup-premium__img'>
            <CDNIcon filename='score-graph-icon_104x104.svg' />
            <p>Detailed personal and business credit reports</p>
          </div>

          <div className='c-signup-premium__img'>
            <CDNIcon filename='matchfactor-icon_168x104.svg' />
            <p>Better MatchFactor scores</p>
          </div>

          <div className='c-signup-premium__img'>
            <CDNIcon filename='cust-serv-icon_136x104.svg' />
            <p>$1M ID theft insurance and recovery help</p>
          </div>
        </div>

        <p className='c-smb-surevey-reference'>
          Business owners with Nav Premium are 41% more likely to get approved
          for a bank loan.*
        </p>

        <div className='c-signup-premium-cta__btn-container'>
          <a
            href='https://app.nav.com/signup/account_information/business'
            className='c-btn c-btn--lg c-btn--upgrade'>
            Continue with Premium
          </a>

          <p className='u-large-copy'>
            Right now, it's <strong>29.99/mo</strong> and you can
            cancel any time.
          </p>
        </div>
      </div>

      <p className='c-smb-surevey-reference'>
        *2015 Nav Small Business Owner Survey
      </p>
    </div>
  )
}
