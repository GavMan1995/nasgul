import isLoggedEnv from '../../utils/is-logged-env'

export function register (server, options, next) {
  if (isLoggedEnv()) {
    server.register({
      register: require('good'),
      options: {
        ops: { interval: 60 * 1000 },
        reporters: {
          console: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ error: '*', log: '*', ops: '*', response: '*' }]
            },
            { module: 'good-console' },
            'stdout'
          ]
        }
      }
    })
  }

  next()
}

register.attributes = { name: 'logging', version: '0.1.0' }
