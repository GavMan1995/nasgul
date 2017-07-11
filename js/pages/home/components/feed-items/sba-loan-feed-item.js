import React from 'react'

import FeedItem from './feed-item'

export default function SBALoanFeedItem (props) {
  const actualFeedItem = Object.assign({}, props.feedItem, {
    destination: '/app/upgrade/premium-plus'
  })

  return (
    <FeedItem
      {...props}
      feedItem={actualFeedItem}
      trackAction={`Click: ${actualFeedItem.title}`} />
  )
}
