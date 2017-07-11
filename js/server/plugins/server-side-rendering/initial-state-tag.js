import serialize from 'serialize-javascript'

export default function initialStateTag (state = {}) {
  return `<script>window.__INITIAL_STATE__ = ${serialize(state)}</script>`
}
