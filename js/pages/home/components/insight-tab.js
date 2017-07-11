import React, { Component } from 'react'

export default class InsightTab extends Component {
  render () {
    const { activeInsight, insight, me } = this.props

    let isSelected = ''

    if (activeInsight.id === insight.id) isSelected = 'is-selected'

    return (
      <a
        className={`c-dashboard__insight-carousel-button ${isSelected}`}
        onClick={() => this.handleClick(me.email)}>
        {insight.tabLabel}
      </a>
    )
  }

  handleClick (userId) {
    window.analytics.track(
      'Card Interaction',
      {
        userId,
        category: 'Dashboard:Insight',
        action: 'Click:Tab',
        label: this.props.insight.tabLabel
      }
    )

    this.props.setActiveInsight(this.props.insight)
  }
}
