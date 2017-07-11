import ops from '../../config/ops'

import isDevelopmentEnv from './utils/is-development-env'
import isProductionEnv from './utils/is-production-env'

import { Server } from 'hapi'

const server = module.exports = exports.default = new Server()

server.connection({
  host: ops.clientHost(),
  port: ops.clientPort(),
  labels: ['pipsqueak']
})

server.route(require('./routes/allosaurus'))
server.route(require('./routes/gringotts'))
server.route(require('./routes/change-business'))
server.route(require('./routes/lexcorp'))
server.route(require('./routes/zuul'))

server.register([
  require('hapi-graceful-pm2'),
  require('./plugins/affiliate-attribution'),
  require('./plugins/csrf-protection'),
  require('./plugins/error-handling'),
  require('./plugins/get-state'),
  require('./plugins/get-generic-state'),
  require('./plugins/health-check'),
  require('./plugins/is-mobile'),
  require('./plugins/logging'),
  require('./plugins/onetime-jwt'),
  require('./plugins/redirect-with-search'),
  require('./plugins/server-side-rendering'),
  require('./plugins/static-routes'),
  require('./plugins/token-check'),
  require('./plugins/track-on-load'),
  require('./plugins/ux-redirects'),
  // NOTE: Routes are last to ensure auth strategies are loaded!
  require('./plugins/page-routes')
]).then(() => {
  if (isDevelopmentEnv() || isProductionEnv()) {
    server.start((error) => {
      if (error) throw error

      console.info(`Server listening at ${server.info.uri}`)
    })
  }
})
