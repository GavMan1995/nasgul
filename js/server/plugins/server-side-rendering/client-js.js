import isProductionEnv from '../../utils/is-production-env'

import assetByExt from './asset-by-ext'

export default function clientJS (pageName) {
  const name = pageName.split('/').pop()

  if (isProductionEnv()) {
    const assets = require('../../../../dist/assets.json')

    return [
      `/static/${assetByExt(assets, 'manifest', 'js')}`,
      `/static/${assetByExt(assets, 'polyfills', 'js')}`,
      `/static/${assetByExt(assets, 'vendor', 'js')}`,
      `/static/${assetByExt(assets, name, 'js')}`
    ]
  } else {
    return [
      '/static/polyfills.js',
      '/static/vendor.js',
      `/static/${name}.js`
    ]
  }
}
