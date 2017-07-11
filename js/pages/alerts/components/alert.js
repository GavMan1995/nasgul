import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import moment from 'moment'

import CDNIcon from '../../../common/components/cdn-icon'

import AlertCtas from './alert-ctas'
import alertCodeCategories from '../data/alert-code-categories'

export default class Alert extends Component {
  constructor (props) {
    super(props)

    this.state = { height: '', expanded: false }
    this._toggleAlertDetails = this._toggleAlertDetails.bind(this)
  }

  render () {
    const {
      alert,
      firstHighUtilizationAlert,
      firstInquiryAlert
    } = this.props

    const { expanded } = this.state

    let expandButtonText = 'View Details'
    if (includesCode(alert.code, alertCodeCategories.highUtilization)) {
      expandButtonText = 'Learn how to reduce your utilization'
    }
    if (includesCode(alert.code, alertCodeCategories.inquiry)) {
      expandButtonText = 'How inquiries impact your credit score'
    }

    let alertType = ''
    if (firstHighUtilizationAlert && alert.date === firstHighUtilizationAlert.date) {
      alertType = 'highUtilization'
    }
    if (firstInquiryAlert && alert.date === firstInquiryAlert.date) {
      alertType = 'inquiry'
    }

    return (
      <div
        className={`c-credit-alert ${this.props.alertOpen ? 'is-open' : ''}`}
        onClick={this._toggleAlertDetails}>
        <div className='c-alert-section__meta-group'>
          <div className='c-alert-section__name js-private'>
            {alert.name}
          </div>
          <div className='c-alert-section__date'>
            {!alert.date ? 'N/A' : moment(alert.date).format('MM/DD/YYYY')}
          </div>
        </div>

        <div className='c-alert-section__content'>
          <div className='c-alert-section__headline'>
            <div className='c-alert-section__alert-from'>
              <p className='c-alert-section__from-text'>
                Alert from:
              </p>
              <img
                className='c-alert-section__bureau-logo'
                src={`https://dxkdvuv3hanyu.cloudfront.net/images/${alert.bureau || 'blank'}-logo.png`} />
            </div>
            <strong className='js-private'>
              {alert.description}
            </strong>
          </div>
          <div
            className='c-alert-section__description'
            style={{ maxHeight: this.state.height }}>
            <p
              className={`c-alert-section__expand-btn ${expanded ? 'is-open' : ''}`}
              onClick={this._toggleAlertDetails}>
              {expandButtonText}
              <CDNIcon filename='icon_chevron_down_8x3_gray.svg' />
            </p>
            <p className='c-alert-section__details'>
              {alert.descriptionText || 'No Detail Provided'}
            </p>
          </div>
        </div>
        <AlertCtas alertCode={alert.code} alertType={alertType} />
      </div>
    )
  }

  _toggleAlertDetails () {
    const element = findDOMNode(this)
    const details = element.querySelector('.c-alert-section__details')
    const description = element.querySelector('.c-alert-section__description')
    const expand = element.querySelector('.c-alert-section__expand-btn')
    const descHeight = _outerHeight(description)
    const height = _outerHeight(details)
    const expHeight = _outerHeight(expand)

    if (!this.state.expanded) {
      this.setState({ height: descHeight + height + expHeight, expanded: true })
    } else if (this.state.expanded) {
      this.setState({ height: '', expanded: false })
    }
  }
}

function _outerHeight (element) {
  if (!element) return 0

  const styles = window.getComputedStyle(element)
  const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)

  return Math.ceil(element.offsetHeight + margin)
}

function includesCode (code, codeList) {
  return codeList.indexOf(code) > -1
}
