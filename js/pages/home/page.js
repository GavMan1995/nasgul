import React, { Component } from 'react'
import { connect } from 'react-redux'

import AuthPage from '../../common/containers/auth-page'

import ClarityCreditScoresSection from './clarity-bet/clarity-credit-score-section'
import ExperianIdCallout from './components/experian-id-callout'
import FeatureFlag from '../../common/components/feature-flag'
import FeedSection from './components/feed-section'
import GoalCalloutSection from './components/goal-callout-section'
import InsightsSection from './components/insights-section'
import NextBestActionAside from './next-best-action-aside/next-best-action-aside'
import ResourcesSection from './components/resources-section'
import ToolsSection from './components/tools-section'

// SMALL BETS
import FinancingCalloutSection from './components/financing-callout-section'
import OnBoardingSection from './on-boarding-bet/on-boarding-section'

class HomePage extends Component {
  render () {
    const {
      activeBusiness,
      activeInsight,
      businessScores,
      featureFlags,
      feedItems,
      fetchInsightData,
      fetchToolData,
      insights,
      me,
      personalScores,
      plan,
      setActiveInsight,
      tools
    } = this.props

    return (
      <div className='c-dashboard-page'>
        <FeatureFlag flagName='on_board_bet' on={<OnBoardingSection />} />
        <FeatureFlag flagName='ppq_callout' on={<ExperianIdCallout />} />

        <div className='o-site-container'>
          <h2 className='c-page-header'>Dashboard</h2>
          <div className='o-container'>
            <main className='o-section o-section--sm-spacing'>
              <ClarityCreditScoresSection
                activeBusiness={activeBusiness}
                businessScores={businessScores}
                featureFlags={featureFlags}
                me={me}
                personalScores={personalScores}
                plan={plan} />
            </main>

            <FeatureFlag
              cookieOverride
              flagName='business_profile_aside'
              on={(
                <aside className='o-section o-section--aside'>
                  <NextBestActionAside />
                </aside>
              )} />
          </div>

          <div className='o-container'>
            <main className='o-section o-section--sm-spacing'>
              <FeatureFlag
                flagName='good_credit_bet'
                on={<FinancingCalloutSection />}
                off={<GoalCalloutSection tools={tools} />} />

              <ToolsSection
                fetchData={fetchToolData}
                me={me}
                tools={tools} />

              <InsightsSection
                activeInsight={activeInsight}
                fetchData={fetchInsightData}
                insights={insights}
                me={me}
                setActiveInsight={setActiveInsight} />

              <ResourcesSection me={me} />
            </main>

            <aside className='o-section o-section--aside'>
              <FeedSection feedItems={feedItems} me={me} />
            </aside>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (store) {
  const {
    activeBusiness,
    activeInsight,
    businessScores,
    feedItems,
    insights,
    me,
    personalScores,
    plan,
    tools
  } = store

  return {
    activeBusiness,
    activeInsight,
    businessScores,
    feedItems,
    insights,
    me,
    personalScores,
    plan,
    tools
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchInsightData () {
      dispatch({ type: 'FETCH_INSIGHT_DATA' })
    },
    fetchToolData () {
      dispatch({ type: 'FETCH_TOOL_DATA' })
    },
    setActiveInsight (insight) {
      dispatch({ type: 'SET_ACTIVE_INSIGHT', insight })
    }
  }
}

module.exports = exports.default = connect(mapStateToProps, mapDispatchToProps)(AuthPage(HomePage))
module.exports.jsFilename = 'home'
