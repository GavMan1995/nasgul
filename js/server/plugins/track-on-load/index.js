import ops from '../../../../config/ops'

export function register (server, options, next) {
  server.decorate(
    'reply',
    'trackOnLoad',
    function trackOnLoad (eventName, properties = {}) {
      this.state('trackOnLoad', { name: eventName, properties })

      return this
    }
  )

  server.state('trackOnLoad', {
    domain: ops.cookieDomain(),
    encoding: 'base64json',
    isHttpOnly: false,
    isSameSite: false,
    isSecure: ops.useSecureCookies(),
    path: '/'
  })

  next()
}

register.attributes = { name: 'track-on-load', version: '0.1.0' }
