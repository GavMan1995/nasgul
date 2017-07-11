import React from 'react'

export default function PasswordHelpText ({ password }) {
  if (!password) return null

  const meetsLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  // Calvin said I could! - ndavis
  const passColor = { color: (meetsLength ? '#00bb7b' : '#ed193f') }
  const upperColor = { color: (hasUpperCase ? '#00bb7b' : '#ed193f') }
  const lowerColor = { color: (hasLowerCase ? '#00bb7b' : '#ed193f') }
  const numColor = { color: (hasNumber ? '#00bb7b' : '#ed193f') }
  const defaultSpanStyle = { paddingRight: '4px' }
  const defaultTextStyle = { color: '#4d5661' }

  return (
    <div className='c-form-validate' style={defaultTextStyle}>
      <p style={{display: 'block', width: '100%'}}>Passwords must:</p>
      <p>
        <span
          className={`fa ${meetsLength ? 'fa-check' : 'fa-times'}`}
          style={Object.assign({}, passColor, defaultSpanStyle)} />
        Be at least 8 characters long
      </p>
      <p>
        <span
          className={`fa ${hasUpperCase ? 'fa-check' : 'fa-times'}`}
          style={Object.assign({}, upperColor, defaultSpanStyle)} />
        Use an upper case letter
      </p>
      <p>
        <span
          className={`fa ${hasLowerCase ? 'fa-check' : 'fa-times'}`}
          style={Object.assign({}, lowerColor, defaultSpanStyle)} />
        Use a lower case letter
      </p>
      <p>
        <span
          className={`fa ${hasNumber ? 'fa-check' : 'fa-times'}`}
          style={Object.assign({}, numColor, defaultSpanStyle)} />
        Use at least one number
      </p>
    </div>
  )
}
