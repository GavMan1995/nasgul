import ops from '../../../config/ops'

export default function isLoggedEnv () {
  return ops.nodeEnv() !== 'test'
}
