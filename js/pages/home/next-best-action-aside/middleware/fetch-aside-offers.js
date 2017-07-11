import { Observable } from 'rx-lite'

export default (store) => (next) => (action) => {
  if (action.type !== 'FETCH_ASIDE_OFFERS') return next(action)

  const limit = 100
  const mergedObservable = Observable.merge(
    fetchObservable(`/client/api/v2/personal_offers?category=Credit%20Cards&limit=${limit}`),
    fetchObservable(`/client/api/v2/personal_offers?category=Lending&limit=${limit}`)
  )

  mergedObservable
    .flatMap((body) => Observable.fromArray(body.data))
    .toArray()
    .subscribe(
      function onNext (offers) {
        store.dispatch({ type: 'RECEIVE_ASIDE_OFFERS', offers })
      },
      function onError () {
        store.dispatch({ type: 'RECEIVE_ASIDE_OFFERS', offers: [] })
      }
    )

  return next(action)
}

function fetchObservable (url) {
  return Observable.fromPromise(window.fetch(url, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.statusCode === 401) return window.location.reload(true)

    throw new Error(`${response.statusText}: ${response.url}`)
  })).catch((error) => {
    if (window.Bugsnag) window.Bugsnag.notifyException(error)
  })
}
