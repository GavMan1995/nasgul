import React from 'react'

export default function BackToTopButton ({ isNavbarFixed }) {
  if (!isNavbarFixed) return null

  return (
    <div
      data-flex--container='row-items--stretch'
      className='u-display--block'
      id='back-to-top'>
      <a
        href='#top'
        data-flex--item='full p-l--md'
        data-flex--container='nowrap row-items--middle middle'
        className='_up-icon'>
        <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/Icon_BacktoTop_Menu.svg' />
        <p data-flex--item='p-l--sm hide--sm'>Back to top</p>
      </a>
    </div>
  )
}
