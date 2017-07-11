import React, { Component } from 'react'

import insightsComponents from './insights'
import InsightTab from './insight-tab'

export default class InsightsSection extends Component {
  render () {
    const { activeInsight, insights, me, setActiveInsight } = this.props

    if (insights.length === 0) return null

    const insightKey = Object.keys(insightsComponents).filter((key) => {
      return insightsComponents[key].isCurrentCode(activeInsight.code)
    })[0]
    const ActiveInsight = insightsComponents[insightKey]

    return (
      <section className='c-card'>
        <div className='c-card__header'>
          <h2>Latest Insights</h2>
        </div>

        <div className='c-card__content c-dashboard__insights'>
          <div
            className='iconfont-Arrow-Left c-dashboard__insight-arrow c-dashboard__insight-arrow--left'
            onClick={this.showPrevInsight.bind(this)} />
          <div
            className='iconfont-Arrow-Right c-dashboard__insight-arrow c-dashboard__insight-arrow--right'
            onClick={this.showNextInsight.bind(this)} />

          <ActiveInsight insight={activeInsight} me={me} />
        </div>

        <div className='c-card__footer c-dashboard__insight-carousel'>
          {insights.map((insight) => {
            return (
              <InsightTab
                key={insight.id}
                activeInsight={activeInsight}
                insight={insight}
                me={me}
                setActiveInsight={setActiveInsight} />
            )
          })}
        </div>
      </section>
    )
  }

  componentDidMount () {
    this.props.fetchData()
  }

  showPrevInsight () {
    trackArrowInteraction(this.props.me.email, 'Previous')

    this.props.setActiveInsight(this.props.insights[this.props.activeInsight.id - 1])
  }

  showNextInsight () {
    trackArrowInteraction(this.props.me.email, 'Next')

    this.props.setActiveInsight(this.props.insights[this.props.activeInsight.id + 1])
  }
}

function trackArrowInteraction (userId, direction) {
  window.analytics.track(
    'Card Interaction',
    {
      userId,
      category: 'Dashboard:Insight',
      action: 'Click:Arrow',
      label: direction
    }
  )
}
