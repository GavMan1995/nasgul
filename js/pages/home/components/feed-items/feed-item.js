import React from 'react'
import moment from 'moment'

export default function FeedItem (props) {
  const { children, feedItem } = props

  return (
    <div className='c-feed-item'>
      <div data-flex--container='true' className='c-feed-item__header'>
        <p className='c-feed-item__timestamp'>
          {moment(feedItem.updated_at).fromNow()}
        </p>
      </div>

      <h3 className='c-feed-item__title'>
        {children || feedItem.header}
      </h3>
      <a
        href={feedItem.destination}
        className='c-feed-item__message'
        onClick={() => trackInteraction(props)}>
        {feedItem.text}
      </a>
    </div>
  )
}

function trackInteraction ({feedItem, me, position, total, trackAction}) {
  window.analytics.track('Card Interaction', {
    userId: me.email,
    category: 'Dashboard:FeedItem',
    action: trackAction,
    label: feedItem.type,
    type: feedItem.type,
    // Lyle's datapoints
    date: feedItem.updated_at,
    header: feedItem.header,
    position,
    text: feedItem.text,
    total
  })
}
