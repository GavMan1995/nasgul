import ops from '../../../config/ops'

export default function isProductionEnv () {
  return ['integration', 'production'].includes(ops.nodeEnv())
}
