import { combineReducers } from 'redux'
import withAuthReducers from '../../../common/utils/with-auth-reducers'

import alertEmails from './alert-emails'
import alertOffer from './alert-offer'
import alertSettings from './alert-settings'
import alertsListFilter from './alerts-list-filter'
import businessAlerts from './business-alerts'
import hasMoreAlerts from './has-more-alerts'
import personalAlerts from './personal-alerts'
import personalScores from './personal-scores'
import toggleAlertSettings from './toggle-alert-settings'

module.exports = combineReducers(withAuthReducers({
  alertEmails,
  alertOffer,
  alertSettings,
  alertsListFilter,
  businessAlerts,
  hasMoreAlerts,
  personalAlerts,
  personalScores,
  toggleAlertSettings
}))
