import React from 'react'

export default function ErrorMessage (props) {
  const { message } = props
  const defaultMessage = (
    <h1 className='h0'>
      We're Sorry, but something went wrong.
    </h1>
  )

  if (message === 'noEnrollment') {
    return (
      <h1 className='h0'>
        It looks like we're having trouble connecting to your bank.
        You may want to try again later.
      </h1>
    )
  }

  if (message === 'timeout') {
    return (
      <h1 className='h0'>
        It's taking an unusually long time to connect to your bank.
        You may want to try again later.
      </h1>
    )
  }

  if (message === 'apiError') {
    return defaultMessage
  }

  if (message === 'tooManyAttempts') {
    return (
      <h1 className='h0'>
        It looks like you've tried too many times.
        You'll need to come back later if you want to try again.
      </h1>
    )
  }

  if (message === 'halted') {
    return (
      <h1 className='h0'>
        Oops... ran out of time.
        <p><a href='/loan-reality/bank-search'>click here</a> to try again.</p>
      </h1>
    )
  }

  return defaultMessage
}
