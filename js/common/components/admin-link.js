import React from 'react'

export default function AdminLink ({ location, roles }) {
  const isCustomerService = roles.filter((role) => {
    return ['Batman', 'Admin', 'Member Service'].indexOf(role) > -1
  }).length > 0

  if (/margaritaville/.test(location.host) && isCustomerService) {
    return (
      <a href='/app/members?ref=navbar' className='c-navbar__admin-link'>
        <p>Admin</p>
      </a>
    )
  }

  return null
}
