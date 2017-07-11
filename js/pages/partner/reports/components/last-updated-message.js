import React from 'react'

export default function LastUpdatedMessage ({ date }) {
  if (!date) return <p>Last Updated 0 Days Ago</p>

  const ms = new Date().getTime() - new Date(date).getTime()
  const days = Math.floor(ms / 1000 / 60 / 60 / 24)
  const unit = days > 1 || days === 0 ? 'Days' : 'Day'

  return <p>Last Updated {`${days} ${unit}`} Ago</p>
}
