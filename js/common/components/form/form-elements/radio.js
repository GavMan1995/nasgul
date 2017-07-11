import React from 'react'

// TODO: Gavyn! Extract the inline style!!
export default function Radio ({ id, label, name, onChange, onFocus, value }) {
  return (
    <div className='c-radio-choice'>
      <input
        type='radio'
        className='c-radio c-radio--primary c-radio--large'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        style={{ cursor: 'pointer' }} />
      <label />
      <p className='js-private'>{label}</p>
    </div>
  )
}
