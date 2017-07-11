export default (store) => (next) => (action) => {
  if (action.type !== 'TOGGLE_ALERT_SETTING') return next(action)

  const result = next(action)
  const { me, alertSettings } = store.getState()

  window.fetch('/client/alert_settings', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include',
    body: JSON.stringify({
      id: alertSettings.id,
      alert_setting: {
        member_id: me.id,
        amount_change_email: alertSettings.receiveAmountChangeEmails,
        derogatory_email: alertSettings.receiveDerogatoryEmails,
        other_email: alertSettings.receiveOtherEmails,
        score_change_email: alertSettings.receiveScoreChangeEmails
      }
    })
  }).then((response) => {
    if (response.ok) {
      store.dispatch({
        type: 'SHOW_SUCCESS_MESSAGE',
        body: 'Alert settings successfully updated!'
      })

      setTimeout(() => store.dispatch({ type: 'HIDE_MESSAGE' }), 3000)
    } else {
      if (response.status === 401) {
        window.location.reload(true)
      } else {
        store.dispatch({
          type: 'SHOW_ERROR_MESSAGE',
          body: 'Sorry, there was an error saving your alert settings.'
        })
      }
    }
  })

  return result
}
