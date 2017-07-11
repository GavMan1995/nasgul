import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'

import Header from '../components/header'
import TimerContainer from './components/timer-container'
import QuestionForm from './components/question-form'

class VerificationPage extends Component {
  constructor (props) {
    super(props)

    this.state = { timedOut: false }
  }

  render () {
    const {
      answers,
      crumb,
      me,
      questionSessionId,
      questions,
      secondsRemaining,
      setVerificationAnswer,
      showError
    } = this.props

    return (
      <div className='c-signup-page'>
        <div className='c-signup-page__container'>
          <Header
            icon='vault_72x72.svg'
            title='Secure Personal Information' />

          <TimerContainer
            secondsRemaining={secondsRemaining}
            timeOut={this.timeOut.bind(this)} />

          <QuestionForm
            answers={answers}
            crumb={crumb}
            hide={this.state.timedOut}
            me={me}
            questionSessionId={questionSessionId}
            questions={questions}
            secondsRemaining={secondsRemaining}
            setVerificationAnswer={setVerificationAnswer}
            showError={showError} />
        </div>
      </div>
    )
  }

  timeOut () {
    this.setState({ timedOut: true })

    this.props.showError("We're sorry but you have run out of time. Please contact Nav at 855-387-1312 and we can help you complete your registration.")
  }
}

function mapStateToProps (state) {
  const {
    answers,
    crumb,
    me,
    questionSessionId,
    questions,
    secondsRemaining
  } = state

  return {
    answers,
    crumb,
    me,
    questionSessionId,
    questions,
    secondsRemaining
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setVerificationAnswer (key, value) {
      dispatch({ type: 'SET_VERIFICATION_ANSWER', key, value })
    },
    showError (body) {
      dispatch({ type: 'SHOW_ERROR_MESSAGE', body, isDismissable: true })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(SignupPage(VerificationPage))
module.exports.jsFilename = 'verification'
