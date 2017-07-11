export default function alertsListFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_ALERTS_LIST_FILTER':
      return action.filter
    default:
      return state
  }
}
