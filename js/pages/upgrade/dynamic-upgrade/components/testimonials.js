import React from 'react'

import CDNAsset from '../../../../common/components/cdn-asset'

export default function Testimonials (props) {
  const { copy } = props

  if (!copy.testimonials) return null

  return (
    <div className='c-upgrade-page-review-container'>
      {copy.testimonials.map((testimony, index) => {
        return (
          <div className='c-upgrade-page-review' key={index}>
            <CDNAsset
              directory='images/nav'
              filename={testimony.img}
              width='64' height='64' />
            <div className='c-upgrade-page-review__content'>
              <p>
                &ldquo;{testimony.copy}&rdquo;
              </p>
              <p>{testimony.name}<br />{testimony.business}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
