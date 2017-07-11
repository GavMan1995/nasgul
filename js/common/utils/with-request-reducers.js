import cookies from '../reducers/cookies'
import crumb from '../reducers/crumb'
import isMobileRequest from '../reducers/is-mobile-request'
import location from '../reducers/location'
import message from '../reducers/message'

export default function addCoreReducers (reducers = {}) {
  return Object.assign({}, {
    cookies,
    crumb,
    isMobileRequest,
    location,
    message
  }, reducers)
}
