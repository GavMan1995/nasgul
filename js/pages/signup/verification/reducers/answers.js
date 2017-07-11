export default function answers (state = {}, action) {
  switch (action.type) {
    case 'SET_VERIFICATION_ANSWER':
      return Object.assign({}, state, { [action.key]: action.value })
    default:
      return state
  }
}
