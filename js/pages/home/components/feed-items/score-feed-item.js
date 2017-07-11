import React from 'react'

import FeedItem from './feed-item'

export default function ScoreFeedItem (props) {
  const actualFeedItem = Object.assign({}, props.feedItem, {
    header: header(props.feedItem),
    text: text(props.feedItem),
    destination: `/app/reports/${props.feedItem.report_pull_id}/analyze`
  })

  return (
    <FeedItem
      {...props}
      feedItem={actualFeedItem}
      trackAction='Click:View Report' />
  )
}

function header ({ change }) {
  let header = 'Your Score Is Unchanged!'

  if (change < 0) header = 'Your Score Went Down!'

  if (change > 0) header = 'Your Score Went Up!'

  return header
}

function text ({ bureau, change }) {
  const absChange = Math.abs(change)
  const pointTextAddon = absChange > 1 ? 's' : ''
  const pointText = 'point' + pointTextAddon
  let text

  if (change < 0) {
    text = `Uh oh! Your ${bureau} score decreased by ${absChange} ${pointText}`
  }

  if (change > 0) {
    text = `Congratulations! Your ${bureau} score increased by ${absChange} ${pointText}`
  }

  return text
}
