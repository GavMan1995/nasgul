export default function decodeReferer (encoded) {
  return window.atob(encoded)
    .replace(/http(?:s)?:\/\//, '')
}
