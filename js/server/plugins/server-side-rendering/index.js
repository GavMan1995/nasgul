import ops from '../../../../config/ops.js'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import clientCSS from './client-css'
import clientJS from './client-js'
import render from './render'

export function register (server, options, next) {
  server.decorate('reply', 'page', function (PageComponent, store) {
    const markup = renderToString(
      <Provider store={store}>
        <PageComponent />
      </Provider>
    )

    const initialState = store.getState()

    // TODO: Move into a better place when refactoring the `get_member_status`!
    // NOTE: Related to my loan shopping experience
    if (initialState.activeBusiness && initialState.activeBusiness.id) {
      this.state('businessId', `${initialState.activeBusiness.id}`, {
        domain: ops.cookieDomain(),
        encoding: 'none',
        isHttpOnly: false,
        isSameSite: false,
        isSecure: ops.useSecureCookies(),
        path: '/'
      })
    }

    return this.response(render(markup, {
      css: clientCSS(PageComponent.jsFilename),
      initialState,
      js: clientJS(PageComponent.jsFilename)
    }))
  })

  next()
}

register.attributes = { name: 'server-side-rendering', version: '0.1.0' }
