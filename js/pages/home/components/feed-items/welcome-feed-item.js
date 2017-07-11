import React from 'react'

import FeedItem from './feed-item'

export default function WelcomeFeedItem (props) {
  const actualFeedItem = Object.assign({}, props.feedItem, {
    header: 'Welcome to Nav!'
  })

  return (
    <FeedItem
      {...props}
      feedItem={actualFeedItem}
      trackAction={`Click: ${actualFeedItem.title}`} />
  )
}
