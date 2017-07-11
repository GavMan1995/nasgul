import ops from '../../../../config/ops'

import cssTags from './css-tags'
import initialStateTag from './initial-state-tag'
import jsTags from './js-tags'

// TODO: Move Google maps API and Recurly only to the pages that need it!
export default function render (markup, options = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <script src="${ops.splitTestingScriptUrl()}"></script>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>${options.title || 'nav'}</title>

        ${cssTags(options.css)}
        <link
          rel="shortcut icon"
          href="${ops.cdnBaseUrl()}/icons/favicon-cyan.png" />
      </head>

      <body>
        <script type="text/javascript">
          (function( a, b, c, d ){
            a = '//tags.tiqcdn.com/utag/nav/main/prod/utag.js'
            b = document
            c = 'script'
            d = b.createElement(c)
            d.src = a
            d.type = 'text/java' + c
            d.async = true
            a = b.getElementsByTagName(c)[0]
            a.parentNode.insertBefore(d, a)
          })()
        </script>
        <div class="js-root">${markup}</div>

        ${initialStateTag(options.initialState)}
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvfE0mS4qeMdHm2fsIfE2XowJj6XG2pW8&libraries=places"></script>
        <script
          src="https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js"
          data-apikey="${ops.notifierApiKey()}"
          data-releasestage="${ops.notifierReleaseStage()}">
        </script>
        <script src="https://js.recurly.com/v3/recurly.js"></script>
        ${jsTags(options.js)}
      </body>
    </html>
  `
}
