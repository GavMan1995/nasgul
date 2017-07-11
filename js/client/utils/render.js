import React from 'react'
import { render as r } from 'react-dom'
import { Provider } from 'react-redux'

export default function render (PageComponent, store) {
  r((
    <Provider store={store}>
      <PageComponent />
    </Provider>
  ), document.querySelector('.js-root'))
}
