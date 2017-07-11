import React, { Component } from 'react'

import feedItemComponents from '../components/feed-items'

export default class FeedSection extends Component {
  render () {
    const { feedItems, me } = this.props

    let content = (
      <div className='c-feed-item c-no-data'>
        <h4>There doesn't seem to be anything here!</h4>
        <p>Don't worry, we'll let you know if anything shows up on your feed.</p>
      </div>
    )

    if (feedItems.length > 0) {
      content = feedItems.map((feedItem, index) => {
        const Component = feedItemComponents[feedItem.type]

        if (Component) {
          return (
            <Component
              key={feedItem.id}
              feedItem={feedItem}
              me={me}
              position={index + 1}
              total={feedItems.length} />
          )
        }
      })
    }

    return (
      <div className='o-container o-container--sm-spacing'>
        <div className='c-card'>
          <div className='c-card__header'>
            <h2>Activity Feed</h2>
          </div>

          <div className='c-card__content'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}
