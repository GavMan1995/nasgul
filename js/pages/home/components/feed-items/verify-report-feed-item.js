import React from 'react'

import FeedItem from './feed-item'

export default function VerifyReportFeedItem (props) {
  const actualFeedItem = Object.assign({}, props.feedItem, {
    header: 'Verify Your Reports',
    text: 'Keep your credit healthy by periodically verifying your credit data with the bureaus',
    destination: '/app/build/credit_sweeper'
  })

  return <FeedItem {...props} feedItem={actualFeedItem} />
}
