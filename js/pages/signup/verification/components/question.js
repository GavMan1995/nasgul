import React from 'react'

import ChoiceInput from './choice-input'

export default function Question (props) {
  const {
    answers,
    invalidFields,
    clearErrors,
    question,
    setVerificationAnswer
  } = props
  const key = `answer${question.number}`

  return (
    <div className={classes(key, invalidFields)}>
      <p className='js-private'>{question.number}. {question.questionText}</p>
      {question.choices.map((choice, index) => {
        return (
          <ChoiceInput
            key={choice.number}
            answers={answers}
            choice={choice}
            question={question}
            setVerificationAnswer={setVerificationAnswer}
            clearErrors={clearErrors} />
        )
      })}
    </div>
  )
}

function classes (key, invalidFields) {
  let result = 'c-signup-page__verification-question'

  if (invalidFields.indexOf(key) > -1) {
    result += ' has-error'
  }

  return result
}
