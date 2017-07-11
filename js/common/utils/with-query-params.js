export default function withQueryParams (url, params = {}) {
  const queryString = Object.keys(params).map((key) => {
    return `${key}=${encodeURI(params[key])}`
  }).join('&')

  if (queryString) {
    return url + (/\?/g.test(url) ? '&' : '?') + queryString
  } else {
    return url
  }
}
