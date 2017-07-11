import React from 'react'

import BackToTopButton from './back-to-top-button'

export default function BottomBar ({ isNavbarFixed }) {
  return (
    <div data-flex--container className='bottom-bar' id='bottomBar'>
      <div data-flex--item='site-container' data-flex--container='nowrap'>
        <a
          href='https://home-c16.incontact.com/inContact/ChatClient/ChatClient.aspx?poc=b6874fb4-4764-468d-a6cf-6a49a9c58bbe&bu=4595002'
          target='_blank'
          data-flex--item='shrink--0 basis--150'
          data-flex--container='nowrap row-items--middle middle'
          className='_chat'
          onClick={() => {
            window.analytics.track('feature_click', {
              category: 'internal_link',
              label: 'chat_with_us',
              name: 'chat_with_us'
            })
          }}>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/icons/Icon_Chat_MenuDeselected.svg' />
          <p data-flex--item='p-l--sm hide--sm'>Chat with us</p>
        </a>

        <BackToTopButton isNavbarFixed={isNavbarFixed} />

        <div data-flex--item='grow--1' />
      </div>
    </div>
  )
}
