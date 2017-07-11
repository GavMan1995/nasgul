import Cookies from 'js-cookie'

export default (store) => (next) => (action) => {
  if (action.type !== 'SET_CURRENT_CARD') return next(action)

  let actualName = action.name

  // Prevent customers from getting stuck on a temporary card!
  if (action.name === 'saving_card') actualName = 'profile_card'

  Cookies.set('asideLastSeenCard', actualName, { domain: window.COOKIE_DOMAIN })

  return next(action)
}
