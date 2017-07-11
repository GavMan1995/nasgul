export default (store) => (next) => (action) => {
  if (action.type !== 'GET_ALERT_OFFER') return next(action)

  const config = {
    category: 'Credit Cards'
  }

  window.fetch(`/client/api/v2/personal_offers${searchParams(config)}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) window.location.reload(true)
  }).then((data) => {
    if (!data) return
    store.dispatch({ type: 'RECEIVE_ALERT_OFFER', offer: data.data[0] })
  })

  return next(action)
}

function searchParams (config) {
  let result = `?category=${config.category}`

  if (config.traitKey && config.traitValue) {
    result += `&${config.traitKey}[]=${config.traitValue}`
  }

  return result
}
