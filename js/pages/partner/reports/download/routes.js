import ops from '../../../../../config/ops'

import * as chromeLauncher from 'chrome-launcher'
import CDP from 'chrome-remote-interface'

module.exports = [
  {
    method: 'GET',
    path: '/partner/reports/download/dnb',
    handler (request, reply) {
      return generatePDF(request, reply, 'dnb', `Dun-and-Bradstreet-Report-${new Date().getTime()}.pdf`)
    },
    config: { auth: false }
  },
  {
    method: 'GET',
    path: '/partner/reports/download/xpn',
    handler (request, reply) {
      return generatePDF(request, reply, 'xpn', `Experian-Report-${new Date().getTime()}.pdf`)
    },
    config: { auth: false }
  }
]

async function generatePDF (request, reply, bureau, filename) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--disable-gpu', '--headless']
  })
  const protocol = await CDP({ port: chrome.port })
  const { Page, Network } = protocol

  const url = `http://lvh.me:5000/partner/reports/report/${bureau}`

  await Network.enable()
  await Network.setCookie({
    url,
    name: 'token',
    value: request.token(),
    domain: ops.cookieDomain(),
    secure: ops.useSecureCookies()
  })

  await Page.enable()

  Page.navigate({ url })

  Page.loadEventFired(async () => {
    const { data } = await Page.printToPDF()

    reply(data)
      .encoding('base64')
      .type('application/pdf')
      .header('content-disposition', `attachment; filename=${filename}`)

    protocol.close()
    chrome.kill()
  })
}
