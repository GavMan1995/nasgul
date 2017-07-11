import isProductionEnv from '../../utils/is-production-env'

import assetByExt from './asset-by-ext'

export default function clientCSS (pageName) {
  let stylesheets = []

  if (isProductionEnv()) {
    const assets = require('../../../../dist/assets.json')
    const name = pageName.split('/').pop()

    stylesheets.push(`/static/${assetByExt(assets, name, 'css')}`)
  }

  return stylesheets
}
