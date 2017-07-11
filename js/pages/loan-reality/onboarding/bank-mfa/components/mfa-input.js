import React from 'react'

export default function MfaInput ({ params }) {
  const { id, label, optional } = params

  return (
    <div
      data-flex--container='true'
      data-flex--item='full'
      className='_input-box'>
      <input
        name={id}
        required={!optional}
        type='text'
        placeholder={`Enter Your Response`}
        data-flex--item='full' />
      <label>{label}</label>
    </div>
  )
}
