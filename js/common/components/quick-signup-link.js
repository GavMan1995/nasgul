import React from 'react'

export default function QuickSignupLink ({ roles }) {
  const isCustomerService = roles.filter((role) => {
    return ['Batman', 'Admin', 'Member Service'].indexOf(role) > -1
  }).length > 0

  if (isCustomerService || roles.indexOf('Affiliate') > -1) {
    return (
      <a href='/app/quick_signup?ref=navbar' className='c-navbar__admin-link'>
        <p>Quick Signup</p>
      </a>
    )
  }

  return null
}
