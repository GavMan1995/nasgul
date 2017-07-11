export default (store) => (next) => (action) => {
  if (action.type !== 'RETRIEVE_ALL_ALERTS') return next(action)

  store.dispatch({
    type: 'SHOW_NOTICE_MESSAGE',
    body: 'Retrieving alerts...',
    isDismissable: false
  })

  window.fetch('/client/alerts/all', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) {
      window.location.reload(true)
    } else {
      store.dispatch({
        type: 'SHOW_ERROR_MESSAGE',
        body: 'Sorry, there was an error retrieving your alerts.'
      })
    }
  }).then((data) => {
    if (!data) return

    store.dispatch({ type: 'HIDE_MESSAGE' })
    store.dispatch({ type: 'RECEIVE_ALL_ALERTS', alerts: data.alerts })
  })

  return next(action)
}
