import withQueryParams from '../../../common/utils/with-query-params'

export function register (server, options, next) {
  server.decorate('reply', 'redirectWithSearch', function redirectWithSearch (uri) {
    // TODO: Handle `uri` with hash id attached
    return this.redirect(withQueryParams(uri, this.request.url.query))
  })

  next()
}

register.attributes = { name: 'redirect-with-search', version: '0.1.0' }
