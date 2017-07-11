export function register (server, options, next) {
  server.route({
    method: 'GET',
    path: '/nav_health',
    handler (request, reply) {
      const now = new Date()

      reply({
        hostname: server.info.host,
        time: now.toISOString(),
        ts: now.getTime() / 1000,
        status: 'allgood'
      })
    },
    config: { auth: false }
  })

  next()
}

register.attributes = { name: 'health-check', version: '0.1.0' }
