import React from 'react'

export default function OwnedCheckbox (props) {
  const { isOwned, isHidden, updateCheckbox } = props

  if (isHidden) return null

  return (
    <div className='c-add-business-flow__checkbox'>
      <input
        className='c-check c-check--secondary-2'
        id='is-owned'
        name='isOwned'
        type='checkbox'
        value={isOwned}
        onChange={updateCheckbox} />
      <label htmlFor='is-owned' />
      <p>I own this business.</p>
    </div>
  )
}
