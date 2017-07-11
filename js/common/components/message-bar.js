import React, { Component } from 'react'
import { connect } from 'react-redux'

import MessageBarBody from './message-bar-body'
import MessageBarCloseButton from './message-bar-close-button'

class MessageBar extends Component {
  constructor (props) {
    super(props)

    this.state = { currentClass: 'c-alert-bar', height: 0 }
  }

  render () {
    const { hideMessage, isNavbarFixed, message } = this.props
    const { currentClass, height } = this.state
    const fixedClass = isNavbarFixed ? 'is-fixed' : ''

    return (
      <div
        className={`${currentClass} ${fixedClass} ${messageClass(message.type)}`}
        style={{ maxHeight: height }}
        ref={(div) => { this.element = div }}>
        <div className='o-site-container'>
          <MessageBarBody message={message} />

          <MessageBarCloseButton hideMessage={hideMessage} message={message} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    if (this.props.message.body && this.props.message.type === 'error') {
      window.analytics.track('error_shown', {
        body: this.props.message.body,
        location: window.location.href
      })
    }

    this.setState({
      currentClass: this.element.getAttribute('class'),
      height: (this.element && this.element.scrollHeight) || 0
    })
  }

  componentDidUpdate () {
    if (this.props.message.body) {
      this.element.style.maxHeight = `${this.element.scrollHeight}px`
    } else {
      this.element.style.maxHeight = '0px'
    }
  }
}

function messageClass (type) {
  switch (type) {
    case 'error':
      return 'c-alert-bar--error'
    case 'success':
      return 'c-alert-bar--success'
    case 'warning':
      return 'c-alert-bar--warning'
    default:
      return ''
  }
}

function mapStateToProps ({ message }) {
  return { message }
}

function mapDispatchToProps (dispatch) {
  return { hideMessage: () => dispatch({ type: 'HIDE_MESSAGE' }) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)
