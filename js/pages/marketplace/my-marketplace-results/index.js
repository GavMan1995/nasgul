import '../styles.scss'

import render from '../../../client/utils/render'

import MyMarketplaceResultsPage from './page'

import { createStore } from 'redux'
import reducers from '../reducers'

const store = createStore(reducers, window.__INITIAL_STATE__)

render(MyMarketplaceResultsPage, store)
