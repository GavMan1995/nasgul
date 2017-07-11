import useragent from 'useragent'

export function register (server, options, next) {
  server.decorate('request', 'isMobile', function isMobile () {
    const {
      android: isAndroid,
      mobile_safari: isMobileSafari
    } = useragent.is(this.headers['user-agent'])

    return isAndroid || isMobileSafari
  })

  next()
}

register.attributes = { name: 'is-mobile', version: '0.1.0' }
