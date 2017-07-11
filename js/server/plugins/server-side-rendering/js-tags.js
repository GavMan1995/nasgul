export default function jsTags (files = []) {
  return files.map((file) => `<script src="${file}"></script>`).join('\n')
}
