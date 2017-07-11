export default (store) => (next) => (action) => {
  if (action.type !== 'UPDATE_BUSINESS_PROFILE') return next(action)

  window.fetch(
    `/client/api/v3/business_profiles/${action.guid}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': store.getState().crumb
      },
      credentials: 'include',
      body: JSON.stringify({
        update_values: {
          annual_gross_revenue: sanitizeRevenue(action.revenue),
          start_date: sanitizeDate(action.date)
        }
      })
    }
  ).then((response) => {
    if (response.ok) {
      store.dispatch({ type: 'SET_CURRENT_CARD', name: 'final_card' })
    } else {
      if (window.Bugsnag) window.Bugsnag.notifyException(new Error(`${response.statusCode}: ${response.textStatus}`))

      store.dispatch({ type: 'SET_CURRENT_CARD', name: 'profile_card' })
      store.dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        body: 'Sorry, we could not add your business data. Our Customer Support team can help at 855-226-8388.',
        isDismissable: true
      })
    }
  })

  return next(action)
}

function sanitizeRevenue (revenue) {
  if (typeof revenue === 'string') revenue = revenue.replace(/[$\s,]/g, '')

  return parseInt(revenue)
}

function sanitizeDate (date) {
  const pattern = /^(\d{2})-(\d{2})-(\d{4})$/
  const match = pattern.exec(date)

  if (match) {
    return `${match[3]}-${match[1]}-${match[2]}`
  } else {
    return ''
  }
}
