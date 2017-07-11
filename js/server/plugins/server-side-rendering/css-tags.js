export default function cssTags (files = []) {
  return files.map((file) => {
    return `<link rel="stylesheet" href="${file}" media="all" />`
  }).join('\n')
}
