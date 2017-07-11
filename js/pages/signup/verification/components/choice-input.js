import React from 'react'

export default function ChoiceInput (props) {
  const {
    answers,
    choice,
    clearErrors,
    question,
    setVerificationAnswer
  } = props
  const key = `answer${question.number}`
  const answer = answers[key]

  return (
    <div className='c-radio-choice'>
      <input
        type='radio'
        className='c-radio c-radio--primary c-radio--large'
        style={{ cursor: 'pointer' }}
        id={`${key}-${choice.number}`}
        name={key}
        value={choice.number}
        required
        checked={parseInt(answer) === choice.number}
        onChange={(event) => {
          clearErrors(event)

          setVerificationAnswer(event.target.name, event.target.value)
        }} />
      <label />
      <p className='js-private'>{choice.text}</p>
    </div>
  )
}
