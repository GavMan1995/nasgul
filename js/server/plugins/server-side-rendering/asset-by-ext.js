export default function assetByExt (assets, name, ext) {
  return assets[name].find((asset) => new RegExp(`.${ext}$`).test(asset))
}
