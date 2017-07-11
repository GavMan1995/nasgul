import React, { Component } from 'react'

export default class ViewInquiriesCta extends Component {
  render () {
    const { alertCode } = this.props

    let copy = 'Your upgraded Nav account tracks who reported an inquiry, what it was for and when it occurred so that you can ensure the accuracy of your report.'
    // Changes copy for auto or mortgage inquiries.
    if (alertCode === 'autoi' || alertCode === 'mtgli') {
      copy = 'Your upgraded Nav account tracks new inquiries so if you’re shopping around for a auto or mortgage loan, you can do it within the 14-day window.'
    }

    return (
      <div className='c-alert-cta'>
        <h4 className='c-alert-cta__pro-tip'>Pro Tip!</h4>
        <p className='c-alert-cta__text'>{copy}</p>
        <div className='c-alert-cta__cnl-cta'>
          <a
            className='c-btn c-btn--primary c-btn--outline'
            href='/app/analyze/scoreboard'
            onClick={() => trackCtaClick()}>
            View Previous Inquiries
          </a>
        </div>
      </div>
    )
  }

  componentDidMount () {
    window.analytics.track('Feature View', {
      category: 'Alerts Page',
      label: `Alerts Page: Inquiry - View Inquiries CTA`,
      name: `Alerts Page: Inquiry - View Inquiries CTA`
    })
  }
}

function trackCtaClick (action) {
  window.analytics.track('Feature Click', {
    category: 'Alerts Page',
    label: `Alerts Page: Inquiry - View Inquiries CTA`,
    name: `Alerts Page: Inquiry - View Inquiries CTA`
  })
}
