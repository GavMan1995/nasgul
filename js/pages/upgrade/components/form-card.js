import React from 'react'

export default function FormCard ({ children, targetCard, currentCard }) {
  const knownCards = ['_card-info', '_billing-info', '_thanks-you']
  const targetIndex = knownCards.indexOf(targetCard)
  const currentIndex = knownCards.indexOf(currentCard)

  return (
    <div
      data-flex--container='column'
      className={(targetIndex <= currentIndex) ? `${targetCard} -open` : targetCard}
      data-hook='card-details'>
      {children}
    </div>
  )
}
