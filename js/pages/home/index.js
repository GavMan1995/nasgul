import './styles.scss'

import render from '../../client/utils/render'

import HomePage from './page'

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'

import fetchInsightData from './middleware/fetch-insight-data'
import fetchToolData from './middleware/fetch-tool-data'

// NBA Aside
import fetchAsideOffers from './next-best-action-aside/middleware/fetch-aside-offers'
import fetchBusinessProfile from './next-best-action-aside/middleware/fetch-business-profile'
import persistCurrentCard from './next-best-action-aside/middleware/persist-current-card'
import updatedBusinessProfile from './next-best-action-aside/middleware/update-business-profile'

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(
  fetchAsideOffers,
  fetchBusinessProfile,
  fetchInsightData,
  fetchToolData,
  persistCurrentCard,
  updatedBusinessProfile
))

render(HomePage, store)
