export default function parseRefreshableReports (rawBody) {
  const data = JSON.parse(rawBody)

  return { hasRefreshableReports: data.any_refreshable }
}
