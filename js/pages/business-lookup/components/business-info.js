import React, { Component } from 'react'

import LoadingOverlay from '../../signup/components/loading-overlay'
import CDNIcon from '../../../common/components/cdn-icon'

export default class BusinessInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messageSent: false,
      riskLevelColor: '',
      nameHasValue: false,
      emailHasValue: false
    }
  }

  render () {
    const { reset, businessSummary } = this.props

    if (businessSummary && businessSummary.business_name) {
      if (this.state.messageSent) {
        return (
          <div className='c-biz-lookup__info-content c-biz-lookup__info-content--center'>
            <h3>Your Message Was Sent</h3>
            <button
              className='c-btn c-btn--primary'
              onClick={() => reset()}>
              Look Up Another Business
            </button>
          </div>
        )
      }

      return (
        <div className='c-biz-lookup__info'>
          <h3>We found a match!</h3>
          <div className='c-biz-lookup__info-content'>
            <h3>{businessSummary.business_name}</h3>
            <p>{businessSummary.street_address}</p>
            <p>
              {businessSummary.city}, {businessSummary.state} {businessSummary.zip}
            </p>

            <div className='c-biz-lookup__info-risk-level'>
              <span style={{ backgroundColor: riskLevelColor(businessSummary.risk_category) }} />

              <div className='c-biz-lookup__robot-icon'
                style={{ backgroundColor: riskLevelColor(businessSummary.risk_category) }}>
                <CDNIcon filename={robotIcon(businessSummary.risk_category)} />
              </div>
              <div>
                <p>Experian Risk Level</p>
                <h3 style={{ color: riskLevelColor(businessSummary.risk_category) }}>
                  {businessSummary.risk_category}
                </h3>
              </div>
            </div>

            <div className='c-biz-lookup__info-risks'>
              <ul>
                {businessSummary.working_flags.map((flag, index) => {
                  let color = '#ed193f'
                  if (flag.code === 'No') {
                    color = '#00bb7b'
                  }

                  return (
                    <li key={index}>
                      <strong style={{ color }}>{flag.code}&#x20;</strong>
                      {flag.name}
                    </li>
                  )
                })}
              </ul>
            </div>

            <p>
              <strong style={{ color: riskLevelColor(businessSummary.risk_category) }}>
                What does this mean?&nbsp;
              </strong>
              {businessSummary.risk_text}
            </p>

            <div className='c-buz-lookup__email-header'>
              <div className='c-buz-lookup__email-header-img'>
                <CDNIcon filename='business-lookup-email.svg' />
              </div>

              <div className='c-buz-lookup__email-header-text'>
                <strong>Share the Knowledge!</strong>
                <p>
                  Many business owners have never seen their business credit
                  snapshot. Send this information to the business owner along
                  with an invitation to join Nav and find out more.
                </p>
              </div>
            </div>

            <form
              className='o-form c-biz-lookup__email-form'
              onSubmit={this.send.bind(this)}>
              <div className={`c-input-wrapper c-input-wrapper--half ${this.state.nameHasValue ? 'has-value' : ''}`}>
                <label>Business Owner Name</label>
                <input
                  type='text'
                  ref='name'
                  onChange={this.checkValueName.bind(this)}
                  required />
              </div>

              <div className={`c-input-wrapper c-input-wrapper--half ${this.state.emailHasValue ? 'has-value' : ''}`}>
                <label>Business Owner Email</label>
                <input
                  type='email'
                  ref='email'
                  onChange={this.checkValueEmail.bind(this)}
                  required />
              </div>

              <textarea
                className='c-biz-lookup__message'
                ref='message'
                placeholder='Message for Business Owner' />

              <button
                className='c-btn c-btn--lg c-btn--primary'
                type='submit'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      )
    } else if (businessSummary && businessSummary.status === '500') {
      return (
        <div>
          <p className='c-biz-lookup__error'>
            We were not able to find a match for {businessSummary.business_name} This could
            mean that the business is new or does not have a robust credit
            history. Nav’s free account has tools to help build your client’s
            credit profile.
          </p>
          <button
            className='c-btn c-btn--lg c-btn--primary c-btn--wrap-text'
            onClick={() => reset()}>
            Look Up Another Business
          </button>
        </div>
      )
    } else {
      return <LoadingOverlay />
    }
  }

  send (event) {
    event.preventDefault()
    let name = this.refs.name.value
    let email = this.refs.email.value
    let message = this.refs.message.value
    this.props.sendMessage(name, email, message)
    this.setState({ messageSent: true })
    window.scrollTo(0, 0)
  }

  checkValueEmail (event) {
    if (event.target.value !== '') {
      this.setState({ emailHasValue: true })
    } else {
      this.setState({ emailHasValue: false })
    }
  }

  checkValueName (event) {
    if (event.target.value !== '') {
      this.setState({ nameHasValue: true })
    } else {
      this.setState({ nameHasValue: false })
    }
  }
}

function riskLevelColor (riskCategory) {
  if (riskCategory === 'Acceptable') {
    return '#00bb7b'
  } else if (riskCategory === 'Caution' || riskCategory === 'Warning') {
    return '#ffc709'
  } else {
    return '#ed193f'
  }
}

function robotIcon (riskCategory) {
  if (riskCategory === 'Acceptable') {
    return 'robot-happy.svg'
  } else if (riskCategory === 'Caution' || riskCategory === 'Warning') {
    return 'robot-meh.svg'
  } else {
    return 'robot-sad.svg'
  }
}
