export default (store) => (next) => (action) => {
  if (action.type !== 'SET_PRIMARY_ALERT_EMAIL') return next(action)

  const result = next(action)

  window.fetch(`/client/emails/${action.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include',
    body: JSON.stringify({ email: { is_primary: true } })
  }).then((response) => {
    if (response.ok) {
      const { alertEmails } = store.getState()
      const { address } = alertEmails.filter((email) => email.isPrimary)[0]

      store.dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        body: `You will now receive email alerts at ${address}!`
      })

      setTimeout(() => store.dispatch({ type: 'HIDE_MESSAGE' }), 3000)
    } else {
      if (response.status === 401) {
        window.location.reload(true)
      } else {
        store.dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          body: 'Sorry, there was an issue with changing your alert email.'
        })
      }
    }
  })

  return result
}
