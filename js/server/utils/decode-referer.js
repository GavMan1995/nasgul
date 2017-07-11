import { Buffer } from 'buffer'

export default function decodeReferer (encoded) {
  return Buffer.from(encoded, 'base64').toString('utf8')
    .replace(/http(?:s)?:\/\//, '')
}
