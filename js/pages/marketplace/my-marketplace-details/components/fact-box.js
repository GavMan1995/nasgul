import React from 'react'

export default function FactBox ({ data, loanTitle }) {
  let title = data.title
  if (title === '') {
    title = `Best Uses for ${loanTitle}`
  }

  let items = data.items
  let icon = data.icon
  if (icon !== '') {
    icon = (<img src={icon} />)
  }
  if (title === 'Pros' && data.icon === '') {
    icon = (<img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/thumbs-up_38x30__green.svg' />)
  }
  if (title === 'Cons' && data.icon === '') {
    icon = (<img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/thumbs-down_38x30__red.svg' />)
  }

  return (
    <div className='c-fact-box'>
      <div className='c-fact-box__title'>
        {icon}
        <h4>{title}:</h4>
      </div>
      <ul className='c-fact-box__copy'>
        {
          items.map((item) => {
            return (
              <li key={`${Math.random()}`}>{item.description}</li>
            )
          })
        }
      </ul>
    </div>
  )
}
