import safeHTMLEntities from '../../../common/utils/safe-html-entities'

export default (store) => (next) => (action) => {
  if (action.type !== 'FETCH_INSIGHT_DATA') return next(action)

  window.fetch('/client/insights', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': store.getState().crumb
    },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) return response.json()

    if (response.status === 401) return window.location.reload(true)

    throw new Error('Failed to retrieve insights')
  }).then((data) => {
    const insights = data.insights.map((insight, index) => {
      return Object.assign({}, insight, {
        id: index,
        tabLabel: tabLabel(insight.code)
      })
    })

    store.dispatch({ type: 'RECEIVE_INSIGHT_DATA', insights })
  }).catch((error) => window.Bugsnag && window.Bugsnag.notifyException(error))

  return next(action)
}

function tabLabel (code) {
  const tabLabels = {
    0: 'No Score',
    1: 'No Tradelines',
    2: 'Accounts Beyond Terms',
    3: 'Derogatory Items',
    4: 'No Score',
    5: 'No Tradelines',
    6: 'Accounts Beyond Terms',
    7: 'No D-U-N-S&reg; Number',
    8: 'No Business',
    9: 'No Experian File',
    10: 'No D&B File',
    11: 'High Debt Usage',
    12: 'Late Payments',
    13: 'Recent Inquiries',
    14: 'Historically Late',
    15: 'Oldest Open',
    16: 'Revolving Without Limit',
    17: 'High Account Usage',
    18: 'Closed Negative Account',
    19: 'Shared Negative Account',
    20: 'All Tradelines Current',
    21: 'No Derogatories',
    22: 'All Tradelines Current',
    23: 'Low Revolving Debt',
    24: 'No Late Payments',
    25: 'No Recent Inquiries',
    26: 'More About Your Business',
    27: 'Summary Has Derogatories',
    28: 'Great Credit!'
  }
  const text = tabLabels[code]

  return safeHTMLEntities(text) || 'You look Good!'
}
