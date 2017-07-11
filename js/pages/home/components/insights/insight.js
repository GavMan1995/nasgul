import React, { Component } from 'react'

import safeHTMLEntities from '../../../../common/utils/safe-html-entities'

export default class Insight extends Component {
  render () {
    const { children, config, insight, me } = this.props

    let actionBtn = null

    if (config.destination) {
      actionBtn = (
        <a
          href={config.destination}
          className='c-btn c-btn--primary'
          onClick={() => trackInteraction(me.email, insight.text)}>
          {safeHTMLEntities(config.buttonText)}
        </a>
      )
    }

    return (
      <div className='c-dashboard__insights-contents'>
        <img src={config.icon} height='96' />
        <h2>{insight.text}</h2>
        {children}
        <p>{insight.action_copy}</p>
        {actionBtn}
      </div>
    )
  }
}

function trackInteraction (userId, label) {
  window.analytics.track(
    'Card Interaction',
    {
      userId,
      category: 'Dashboard:Insight',
      action: 'Click:Action',
      label
    }
  )
}
