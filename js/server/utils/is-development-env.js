import ops from '../../../config/ops'

export default function isDevelopmentEnv () {
  return ops.nodeEnv() === 'development'
}
