import glob from 'glob'
import path from 'path'

export function register (server, options, next) {
  const pagesDir = path.join(__dirname, '..', '..', '..', 'pages')
  const pageRouteFiles = glob.sync(path.join(pagesDir, '**', 'routes.js'))
  pageRouteFiles.forEach((file) => server.route(require(file)))

  next()
}

register.attributes = { name: 'page-routes', version: '0.1.0' }
