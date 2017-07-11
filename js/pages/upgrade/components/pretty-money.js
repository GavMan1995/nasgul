import React from 'react'

export default function PrettyMoney ({ priceInCents }) {
  return <span>${priceInCents / 100}</span>
}
