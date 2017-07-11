export default (store) => (next) => (action) => {
  if (action.type !== 'FETCH_BUSINESS_PROFILE') return next(action)

  window.fetch('/client/api/v3/business_profiles', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'include'
  }).then((response) => {
    if (!response.ok) throw new Error('Failed to fetch business profile')

    return response.json()
  }).then((body) => {
    const activeProfile = body.businesses.filter((business) => {
      return !!business.business_id
    }).shift() || {}

    store.dispatch({
      type: 'RECEIVE_BUSINESS_PROFILE',
      profile: {
        annual_gross_revenue: (activeProfile.financials && activeProfile.financials.annual_gross_revenue) || '',
        guid: activeProfile.guid,
        start_date: (activeProfile.details && activeProfile.details.start_date) || ''
      }
    })
  }).catch((error) => {
    if (window.Bugsnag) window.Bugsnag.notifyException(error)

    store.dispatch({ type: 'SET_CURRENT_CARD', name: 'initial_card' })
    store.dispatch({
      type: 'SHOW_ERROR_MESSAGE',
      body: 'Sorry, we could not retreive your business data. Our Customer Support team can help at 855-226-8388.',
      isDismissable: true
    })
  })

  return next(action)
}
