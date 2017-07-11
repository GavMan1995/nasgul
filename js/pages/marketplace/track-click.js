export default function trackClick (category, action, name, options = {}) {
  window.analytics.track(action, Object.assign({}, {
    category,
    name,
    label: name
  }, options))
}
