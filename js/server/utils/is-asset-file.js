export default function isAssetFile (pathname) {
  return /\.(css|ico|js|map)$/.test(pathname)
}
