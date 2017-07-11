import core from '../reducers'

export default function addCoreReducers (reducers = {}) {
  return Object.assign({}, core, reducers)
}
