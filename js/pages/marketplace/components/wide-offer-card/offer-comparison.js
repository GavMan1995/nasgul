import React from 'react'

export default function OfferComparison ({ comparison }) {
  let image = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/bottom-line_32x22.svg' />

  if (!comparison) return null

  if (comparison.title === 'Pros') {
    image = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/thumbs-up_38x30__green.svg' />
  }

  if (comparison.title === 'Cons') {
    image = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/thumbs-down_38x30__red.svg' />
  }

  return (
    <div className='c-wide-offer-card__icon-list-item'>
      {image}
      <p><strong>{comparison.title}</strong>{comparison.description}</p>
    </div>
  )
}
