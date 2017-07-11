export default function tools (state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_TOOL_DATA':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
