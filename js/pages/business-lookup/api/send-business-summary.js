export default (store) => (next) => (action) => {
  if (action.type !== 'SEND_BUSINESS_SUMMARY') return next(action)

  const body = {
    summary_id: action.summaryId,
    name: action.name,
    email: action.email,
    message: action.message
  }

  window.fetch('/client/business_lookup/email', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include',
    body: JSON.stringify(body)
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) {
      window.location.reload(true)
    } else {
      store.dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        body: 'Sorry, there was an error sending that email. Please try again.'
      })

      throw new Error('Failed to send business summary email.')
    }
  }).then((data) => {
    if (!data) return

    store.dispatch({ type: 'SHOW_SUCCESS_MESSAGE', body: 'SWEET ACTION WE SENT IT' })
  })

  return next(action)
}
