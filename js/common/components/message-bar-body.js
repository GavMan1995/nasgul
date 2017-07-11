import React from 'react'

export default function MessageBarBody ({ message }) {
  if (message.actionUrl && message.actionUrl !== '') {
    return (
      <a
        href={message.actionUrl}
        className='js-alerts-email-bet'
        onClick={() => {
          const { type } = message
          const prettyType = `${type[0].toUpperCase()}${type.slice(1)}`

          window.analytics.track('Feature Click', {
            category: 'Internal Link',
            label: `${prettyType}: Message Body`,
            name: `${prettyType}: Message Body`
          })
        }}>
        <p>{message.body}</p>
      </a>
    )
  } else {
    return <p>{message.body}</p>
  }
}
