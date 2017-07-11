import path from 'path'

import ops from '../../../../config/ops'

import isDevelopmentEnv from '../../utils/is-development-env'
import isProductionEnv from '../../utils/is-production-env'

export function register (server, options, next) {
  // Development proxies static asset requests to a webpack dev server
  if (isDevelopmentEnv()) {
    server.register(require('h2o2')).then(() => {
      server.route({
        method: 'GET',
        path: '/static/{filename}',
        handler (request, reply) {
          reply.proxy({
            host: ops.assetsHost(),
            port: ops.assetsPort(),
            protocol: 'http'
          })
        },
        config: { auth: false }
      })
    })
  }

  // Production environments server static assets bundled into the dist folder
  if (isProductionEnv()) {
    server.register(require('inert')).then(() => {
      server.route({
        method: 'GET',
        path: '/static/{filename}',
        handler: {
          directory: {
            index: false,
            path: path.join(__dirname, '..', '..', '..', '..', 'dist')
          }
        },
        config: { auth: false }
      })
    })
  }

  next()
}

register.attributes = { name: 'static-routes', version: '0.1.0' }
