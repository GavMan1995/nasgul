export default function isNavbarFixed (state = false, action) {
  switch (action.type) {
    case 'TOGGLE_NAVBAR':
      return action.isFixed
    default:
      return state
  }
}
