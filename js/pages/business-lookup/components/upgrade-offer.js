import React from 'react'
import CDNIllustration from '../../../common/components/cdn-illustration'

export default function UpgradeOffer () {
  return (
    <div className='c-biz-lookup'>
      <div className='c-biz-lookup__img'>
        <CDNIllustration filename='business_light-blue_190x190.svg' />
      </div>
      <div className='c-biz-lookup__content'>
        <h1>Business Look Up</h1>
        <p className='c-biz-lookup__upgrade-text'>
          Instantly see a snapshot of any business's credit report.
          You can also share it with one click, and help them build their
          credit profile.
        </p>

        <p className='c-biz-lookup__upgrade-text'>
          <strong>
            Business Look Up is available on our Premium plan. In order to
            access it, you need to upgrade.
          </strong>
        </p>

        <div className='c-biz-lookup__btn-wrapper c-biz-lookup__btn-wrapper--align-left'>
          <a
            href='/app/upgrade/premium'
            className='c-btn c-btn--lg c-btn--upgrade'>
            <img
              height='24'
              className='c-btn--upgrade__icon'
              src='https://dxkdvuv3hanyu.cloudfront.net/icons/icon-premium-white.svg' />
            Upgrade your Account
          </a>
        </div>

      </div>
    </div>
  )
}
