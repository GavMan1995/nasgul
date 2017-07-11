import React from 'react'

export default function CredentialInput ({ params }) {
  const { id, label, inputType, optional } = params

  let inputStyle = {}

  if (inputType === 'PASSWORD') inputStyle = { WebkitTextSecurity: 'disc' }

  return (
    <div
      data-flex--container='true'
      data-flex--item='full'
      className='_input-box'>
      <input
        style={inputStyle}
        name={id}
        required={!optional}
        type={inputType}
        placeholder={`Enter Your ${label}`}
        data-flex--item='full' />
      <label>{label}</label>
    </div>
  )
}
