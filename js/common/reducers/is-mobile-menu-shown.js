export default function isMobileMenuShown (state = false, action) {
  switch (action.type) {
    case 'TOGGLE_MOBILE_MENU':
      return action.isShown
    default:
      return state
  }
}
