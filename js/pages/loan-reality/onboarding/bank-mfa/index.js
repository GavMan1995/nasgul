import '../../styles.scss'

import render from '../../../../client/utils/render'

import BankMfaPage from './page'

import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers, window.__INITIAL_STATE__)

render(BankMfaPage, store)
