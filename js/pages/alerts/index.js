import './styles.scss'

import render from '../../client/utils/render'

import AlertPage from './page'

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'

import getAlertOffer from './middleware/get-alert-offer'
import retrieveAllAlerts from './middleware/retrieve-all-alerts'
import updateAlertEmail from './middleware/update-alert-email'
import updateAlertSettings from './middleware/update-alert-settings'

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(
  getAlertOffer,
  retrieveAllAlerts,
  updateAlertEmail,
  updateAlertSettings
))

render(AlertPage, store)
