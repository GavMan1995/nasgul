export default (store) => (next) => (action) => {
  if (action.type !== 'FETCH_TOOL_DATA') return next(action)

  window.fetch('/client/build', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) return window.location.reload(true)

    throw new Error('Failed to retrieve build data')
  }).then((data) => {
    store.dispatch({ type: 'RECEIVE_TOOL_DATA', data })
  }).catch((error) => window.Bugsnag && window.Bugsnag.notifyException(error))

  return next(action)
}
