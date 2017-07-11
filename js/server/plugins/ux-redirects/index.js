import ops from '../../../../config/ops'

import isAssetFile from '../../utils/is-asset-file'

import isSignupPath from './is-signup-path'

export function register (server, options, next) {
  server.ext('onPostHandler', (request, reply) => {
    if (request.method !== 'get') return reply.continue()

    if (isAssetFile(request.url.pathname)) return reply.continue()

    if (/^\/(?:client|login|logout)/.test(request.url.pathname)) {
      return reply.continue()
    }

    const context = request.context || {}
    const hasRefreshableReports = context.hasRefreshableReports || false
    const me = context.me || {}
    const plan = context.plan || {}

    if (me.accountState === 'cancelled') {
      return reply.redirect(`${ops.appBaseUrl()}/app/reactivate`)
    }

    if (isSignupPath(request) && /(?:manually|precise_id)_verified$/.test(me.idVerifyState)) {
      return reply.redirectWithSearch('/home')
    }

    if (isSignupPath(request) && me.idVerifyState === 'not_verified' && plan.planCode !== 'freemium') {
      return reply.redirectWithSearch('/home')
    }

    if (!isSignupPath(request) && me.idVerifyState === 'not_verified' && plan.planCode === 'freemium') {
      return reply.redirectWithSearch('/personal-info')
    }

    if (!isSignupPath(request) && /failed$/.test(me.idVerifyState) && me.verificationAttemptsRemaining) {
      return reply.redirectWithSearch('/personal-info')
    }

    if (/failed$/.test(me.idVerifyState) && !me.verificationAttemptsRemaining && request.url.pathname !== '/call-us') {
      return reply.redirectWithSearch('/call-us')
    }

    if (request.url.pathname === '/home' && hasRefreshableReports) {
      return reply.redirect(`${ops.appBaseUrl()}/app/dashboard?reason=reports`)
    }

    reply.continue()
  })

  next()
}

register.attributes = { name: 'ux-redirects', version: '0.1.0' }
