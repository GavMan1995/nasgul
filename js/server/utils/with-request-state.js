export default function withRequestState (request, state = {}) {
  return Object.assign({}, {
    cookies: request.state,
    crumb: request.plugins.crumb,
    location: {
      host: request.info.host,
      pathname: request.url.pathname,
      query: request.url.query
    },
    message: request.message
  }, state)
}
