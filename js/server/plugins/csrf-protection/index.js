import ops from '../../../../config/ops'

export function register (server, options, next) {
  server.register({
    register: require('crumb'),
    options: {
      cookieOptions: { isSecure: ops.useSecureCookies() }
    }
  })

  next()
}

register.attributes = { name: 'csrf-protection', version: '0.1.0' }
