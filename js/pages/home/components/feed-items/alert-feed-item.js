import React from 'react'

import FeedItem from './feed-item'

export default function AlertFeedItem (props) {
  const actualFeedItem = Object.assign({}, props.feedItem, {
    text: props.feedItem.title,
    destination: '/app/alerts'
  })

  return (
    <FeedItem
      {...props}
      feedItem={actualFeedItem}
      trackAction='Click:View Alerts'>
      <img
        src='https://dxkdvuv3hanyu.cloudfront.net/images/nav-alert-yellow.svg'
        height='22' />
      Credit Alert
    </FeedItem>
  )
}
