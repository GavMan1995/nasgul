import React, { Component } from 'react'
import { connect } from 'react-redux'

import SignupPage from '../../../common/containers/signup-page'
import ErrorMessage from './components/error-message'

class SomethingWentWrongPage extends Component {
  render () {
    return (
      <div className='c-warning-box'>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/customer-rep_256x226.svg'
          className='c-warning-box__image' />
        <div className='c-warning-box__copy'>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/customer-rep_198x176.svg'
            className='c-warning-box__image' />
          <ErrorMessage message={this.props.errorMessage.errorMessage} />
          <div className='c-warning-box__cta'>
            <p className='c-large-copy'>
              <em>
                We'd be happy to help get it sorted out, give our customer
                service team a call at
                <a href='tel:18552268388'>1-855-226-8388</a>.
              </em>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (errorMessage) {
  return { errorMessage }
}

module.exports = exports.default = connect(mapStateToProps)(SignupPage(SomethingWentWrongPage))
module.exports.jsFilename = 'something-went-wrong'
