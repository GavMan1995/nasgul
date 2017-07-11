export default function isSignupPath (request) {
  return [
    '/personal-info',
    '/verification',
    '/identification',
    '/personal-info-b',
    '/try-again'
  ].includes(request.url.pathname)
}
