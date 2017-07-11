import '../styles.scss'

import render from '../../../client/utils/render'

import DebtManagementPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers, window.__INITIAL_STATE__)

render(DebtManagementPage, store)
