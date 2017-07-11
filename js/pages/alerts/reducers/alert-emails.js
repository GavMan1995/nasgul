export default function alertEmails (state = [], action) {
  switch (action.type) {
    case 'SET_PRIMARY_ALERT_EMAIL':
      return state.map(({ id, address }) => {
        return { id, address, isPrimary: id === action.id }
      })
    default:
      return state
  }
}
