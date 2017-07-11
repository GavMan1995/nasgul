import React from 'react'

export default function UserDropdown ({ me }) {
  return (
    <div className='c-user-menu c-dropdown-menu'>
      <a
        href='/app/profile?ref=navbar'
        className='c-user-menu__name c-dropdown-menu__title'>
        {me.firstName}
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/icon_global-nav-profile_32x32_gray.svg'
          className='c-user-menu__picture' />
      </a>

      <div className='c-dropdown-menu__dropdown'>
        <a href='/app/profile?ref=navbar' className='c-dropdown-menu__option'>
          <p className='c-user-menu__option-title'>Profile</p>
        </a>

        <a href='/app/settings?ref=navbar' className='c-dropdown-menu__option'>
          <p className='c-user-menu__option-title'>Settings</p>
        </a>

        <a href='/business-lookup?ref=navbar' className='c-dropdown-menu__option'>
          <p className='c-user-menu__option-title'>Business Look Up</p>
        </a>

        <a href='/logout' className='c-dropdown-menu__option'>
          <p className='c-user-menu__option-title'>Logout</p>
        </a>
      </div>
    </div>
  )
}
