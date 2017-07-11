import React from 'react'

export default function GetStartedLink ({ link, track, position }) {
  return (
    <div className='c-loan-reality-card__get-started-link'>
      <a
        href={link}
        onClick={() => track(position)}>
        Get Started
      </a>
    </div>
  )
}
