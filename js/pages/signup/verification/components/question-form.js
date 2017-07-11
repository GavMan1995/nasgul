import React, { Component } from 'react'

import Question from './question'

export default class QuestionForm extends Component {
  constructor (props) {
    super(props)

    this.state = { invalidFields: [] }
  }

  render () {
    const {
      answers,
      crumb,
      hide,
      questionSessionId,
      questions,
      setVerificationAnswer
    } = this.props
    const { invalidFields } = this.state

    // Hide if the timer timed out, or we have not recieved questions yet
    if (hide) return null

    let errors = null

    if (invalidFields.length) {
      errors = (
        <p className='c-signup-page__error-text'>
          Please answer all questions to continue.
        </p>
      )
    }

    return (
      <form
        method='POST'
        action='/verification'
        className='c-signup-page__form'
        onSubmit={this.handleSubmit.bind(this)}
        noValidate>
        <input type='hidden' name='crumb' value={crumb} />
        <input type='hidden' name='sessionId' value={questionSessionId} />

        {questions.map((question) => {
          return (
            <Question
              key={question.number}
              answers={answers}
              invalidFields={invalidFields}
              question={question}
              setVerificationAnswer={setVerificationAnswer}
              clearErrors={this.clearErrors.bind(this)} />
          )
        })}

        {errors}

        <button
          className='c-btn c-btn--primary c-signup-page__submit-btn'
          type='submit'>
          Continue
        </button>
      </form>
    )
  }

  handleSubmit (event) {
    const invalidFields = Object.keys(this.props.answers).filter((key) => {
      return this.props.answers[key] === ''
    })

    if (invalidFields.length > 0) {
      event.preventDefault()

      window.analytics.track('SignUp Verification: Form Submit Unanswered Questions', {
        userId: this.props.me.email,
        category: 'SignUp:Verification',
        action: 'Submit',
        label: 'Verify Questions'
      })

      this.setState({ invalidFields })
    }
  }

  clearErrors (event) {
    const { invalidFields } = this.state
    const targetField = event.target.name

    if (invalidFields.indexOf(targetField) > -1) {
      const fields = invalidFields.filter((field) => {
        return field !== targetField
      })

      this.setState({ invalidFields: fields })
    }
  }
}
