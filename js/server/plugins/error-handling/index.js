import bugsnag from 'bugsnag'
import path from 'path'

import ops from '../../../../config/ops'

import encodeReferer from '../../utils/encode-referer'

import accountGuid from './account-guid'

// Comment out the `notifyReleaseStages` to test in development
bugsnag.register(ops.serverNotifierApiKey(), {
  notifyReleaseStages: [
    'production',
    'integration',
    'integration1',
    'integration3'
  ],
  releaseStage: ops.notifierReleaseStage()
})

export function register (server, options, next) {
  server.register(require('inert')).then(() => {
    server.ext('onPreResponse', (request, reply) => {
      if (request.response.isBoom) {
        // Require a login for any unauthorized errors
        if (request.response.output.statusCode === 401) {
          console.error(request.response.message)

          const referer = encodeReferer(`${request.info.host}${request.url.path}`)

          return reply.redirect(`/login?referer=${referer}`)
        }

        // If the requested path isn't handled by facehugger, pass it to nav_web
        if (request.response.output.statusCode === 404) {
          console.warn(`Page not found: ${request.url.href}`)
          console.warn(`Redirecting to: ${ops.appBaseUrl()}${request.url.path}`)

          return reply.redirect(`${ops.appBaseUrl()}${request.url.path}`)
        }

        // Log to facehugger's...log
        console.error(`${request.response.name}: ${request.response.message} (${request.response.output.statusCode})`)

        // Notify the Bugsnag integration
        bugsnag.notify(request.response, {
          context: request.url.path,
          errorName: request.response.name,
          userId: accountGuid(request.token())
        })

        if (ops.showErrors()) return reply.continue()

        // Render static error page with `inert`
        reply
          .file(path.join(__dirname, '..', '..', '..', '..', 'public', '50x.html'))
          .code(request.response.output.statusCode)
      } else {
        reply.continue()
      }
    })
  })

  next()
}

register.attributes = { name: 'error-handling', version: '0.1.0' }
