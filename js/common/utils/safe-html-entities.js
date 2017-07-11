// TODO: Write a test!
export default function safeHTMLEntities (string) {
  let result = string.slice()

  if (/&reg;/.test(result)) {
    result = result.split('&reg;').join(String.fromCharCode(174))
  }

  return result
}
