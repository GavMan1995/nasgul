import React from 'react'

import PageWrapper from '../../components/page-wrapper'

export default function BusinessAlreadyAdded (props) {
  const { allowedFollowCount, plan } = props

  let componentText = (
    <p>
      It looks like your plan does not allow you to follow any more
      businesses. Please go to your <a href='/app/settings' onClick={() => trackFinalInteraction()}>settings</a> to unfollow a business.
    </p>
  )

  if (plan !== 'Premium Plus') {
    componentText = (
      <p>
        It looks like your plan does not allow you to follow any more
        businesses. Please go to your <a href='/app/settings' onClick={() => trackFinalInteraction()}>settings</a> to unfollow a business
        or <a href='/app/upgrade'>upgrade</a> to be able to follow more than {allowedFollowCount} business{allowedFollowCount > 1 ? 'es' : ''}.
      </p>
    )
  }

  return (
    <PageWrapper isLargeImg='true' headerText=''>
      {componentText}
    </PageWrapper>
  )
}

function trackFinalInteraction () {
  window.analytics.track('Final Interaction', {
    name: 'settings',
    label: 'settings',
    category: 'Add Business Interaction'
  })
}
