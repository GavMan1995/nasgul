import React from 'react'

export default function Footer () {
  return (
    <div className='c-page-footer'>
      <p>&copy; {new Date().getFullYear()} Nav All Rights Reserved</p>
      <ul className='c-page-footer__links'>
        <li><a href='http://www.nav.com/terms' target='_blank'>Terms</a></li>
        <li><a href='http://www.nav.com/privacy' target='_blank'>Privacy</a></li>
        <li><a href='https://www.nav.com/contact' target='_blank'>Contact Us</a></li>
      </ul>
    </div>
  )
}
