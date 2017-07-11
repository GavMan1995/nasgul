export default (store) => (next) => (action) => {
  if (action.type !== 'FETCH_BUSINESS_SUMMARY') return next(action)

  window.fetch('/client/business_lookup', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include',
    body: JSON.stringify({ name: action.name, zip_code: action.zip })
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) {
      window.location.reload(true)
    } else {
      store.dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        body: 'Sorry, there was an error retrieving your business summary.'
      })

      throw new Error('Failed to find business summary.')
    }
  }).then((data) => {
    if (!data) return

    store.dispatch({ type: 'RECEIVE_BUSINESS_SUMMARY', data })
  })

  return next(action)
}
