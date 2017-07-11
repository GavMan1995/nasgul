import React from 'react'

export default function MessageBarCloseButton ({ hideMessage, message }) {
  if (message && !message.isDismissable) return null

  return (
    <button
      className='c-alert-bar__close-btn c-btn c-btn--outline'
      onClick={() => {
        const { type } = message
        const prettyType = `${type[0].toUpperCase()}${type.slice(1)}`

        window.analytics.track('Feature Click', {
          category: 'Internal Link',
          label: `${prettyType}: Message Dismissed`,
          name: `${prettyType}: Message Dismissed`
        })

        hideMessage()
      }}>
      Close
    </button>
  )
}
