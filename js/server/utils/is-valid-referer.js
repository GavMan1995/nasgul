export default function isValidReferer (referer) {
  return /^(([a-z0-9-]?)+\.nav\.com|lvh.me)/.test(referer)
}
