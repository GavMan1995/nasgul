import safeStringToNumber from './safe-string-to-number'

export default function prettyMoneyString (number) {
  try {
    return `$ ${safeStringToNumber(number).toLocaleString('en-US')}`
  } catch (e) {
    return '$ 0'
  }
}
