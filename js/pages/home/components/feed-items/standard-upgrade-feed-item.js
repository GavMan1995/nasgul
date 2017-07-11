import React, { Component } from 'react'

import FeedItem from './feed-item'

export default class StandardUpgradeFeedItem extends Component {
  constructor (props) {
    super(props)

    this.state = { level: 'premium' }
  }

  render () {
    const actualFeedItem = Object.assign({}, this.props.feedItem, {
      destination: `/app/upgrade/${this.state.level}`
    })

    return (
      <FeedItem
        {...this.props}
        feedItem={actualFeedItem}
        trackAction={`Click: ${actualFeedItem.title}`} />
    )
  }

  componentDidMount () {
    window.fetch('/client/promos/offer_level', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': this.props.crumb
      },
      credentials: 'include'
    }).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({ level: data.level })
    })
  }
}
