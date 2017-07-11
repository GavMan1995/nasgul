import './styles.scss'

import render from '../../client/utils/render'

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'

import BusinessLookupPage from './page'
import fetchBusinessSummary from './api/fetch-business-summary'
import sendBusinessSummary from './api/send-business-summary'

const initialState = window.__INITIAL_STATE__
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(fetchBusinessSummary, sendBusinessSummary)
)

render(BusinessLookupPage, store)
