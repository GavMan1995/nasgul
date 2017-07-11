export default function withRequestHeaders (request, headers = {}) {
  return Object.assign({}, {
    'accept': 'application/json',
    'accept-encoding': 'utf-8',
    'content-type': 'application/json',
    'cookie': request.headers['cookie'],
    'user-agent': request.headers['user-agent']
  }, headers)
}
