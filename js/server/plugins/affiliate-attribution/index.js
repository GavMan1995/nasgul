import ops from '../../../../config/ops'

import isAssetFile from '../../utils/is-asset-file'

const cookieConfig = {
  domain: ops.cookieDomain(),
  encoding: 'base64',
  isHttpOnly: false,
  isSameSite: false,
  isSecure: ops.useSecureCookies(),
  path: '/',
  ttl: 90 * 24 * 60 * 60 * 1000
}

export function register (server, options, next) {
  server.decorate('request', 'affiliateAttribution', function affiliateAttribution () {
    const { clickid, irpid, irmpname } = this.state
    const result = {}

    if (clickid) result.clickid = clickid

    if (irpid) result.irpid = irpid

    if (irmpname) result.irmpname = irmpname

    return result
  })

  server.ext('onRequest', (request, reply) => {
    if (isAssetFile(request.url.pathname)) return reply.continue()

    const { clickid, irpid, irmpname } = request.url.query

    if (clickid) reply.state('clickid', clickid)

    if (irpid) reply.state('irpid', irpid)

    if (irmpname) reply.state('irmpname', irmpname)

    reply.continue()
  })

  server.state('clickid', cookieConfig)
  server.state('irpid', cookieConfig)
  server.state('irmpname', cookieConfig)

  next()
}

register.attributes = { name: 'affiliate-attribution', version: '0.1.0' }
