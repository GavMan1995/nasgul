import React, { Component } from 'react'
import { connect } from 'react-redux'

import BizProfileCard from './biz-profile-card'
import FinalNbaCard from './final-nba-card'
import InitialNbaCard from './initial-nba-card'
import SavingCard from './saving-card'

class NextBestActionAside extends Component {
  render () {
    const {
      activeProfile,
      activeProfileLoaded,
      asideOffers,
      asideOffersLoaded,
      currentCard,
      fetchAsideOffers,
      fetchBusinessProfile,
      setCurrentCard,
      updateBusinessProfile
    } = this.props

    let backBtn = null

    if (currentCard === 'final_card' && asideOffersLoaded) {
      backBtn = (
        <a onClick={() => setCurrentCard('profile_card')}>&#60; Go Back</a>
      )
    }

    let currentComponent = null

    if (currentCard === 'profile_card') {
      currentComponent = (
        <BizProfileCard
          activeProfile={activeProfile}
          activeProfileLoaded={activeProfileLoaded}
          fetchBusinessProfile={fetchBusinessProfile}
          setCurrentCard={setCurrentCard}
          updateBusinessProfile={updateBusinessProfile} />
      )
    } else if (currentCard === 'final_card') {
      currentComponent = (
        <FinalNbaCard
          asideOffers={asideOffers}
          asideOffersLoaded={asideOffersLoaded}
          fetchAsideOffers={fetchAsideOffers}
          setCurrentCard={setCurrentCard} />
      )
    } else if (currentCard === 'saving_card') {
      currentComponent = <SavingCard />
    } else {
      currentComponent = <InitialNbaCard setCurrentCard={setCurrentCard} />
    }

    return (
      <div className='c-next-best-action-aside'>
        <h3>Your Next Best Action</h3>
        {backBtn}

        {currentComponent}

        <div className='c-carousel-indicators'>
          <div className={isActive(currentCard, 'initial_card')} />
          <div className={isActive(currentCard, 'profile_card')} />
          <div className={isActive(currentCard, ['saving_card', 'final_card'])} />
        </div>
      </div>
    )
  }
}

function isActive (currentCard, targetCard) {
  if (Array.isArray(targetCard)) {
    return targetCard.indexOf(currentCard) > -1 ? 'is-active' : ''
  } else {
    return currentCard === targetCard ? 'is-active' : ''
  }
}

function mapStateToProps (state) {
  const {
    activeProfile,
    activeProfileLoaded,
    asideOffers,
    asideOffersLoaded,
    currentCard
  } = state

  return {
    activeProfile,
    activeProfileLoaded,
    asideOffers,
    asideOffersLoaded,
    currentCard
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchAsideOffers () {
      dispatch({ type: 'FETCH_ASIDE_OFFERS' })
    },
    fetchBusinessProfile () {
      dispatch({ type: 'FETCH_BUSINESS_PROFILE' })
    },
    setCurrentCard (name) {
      dispatch({ type: 'SET_CURRENT_CARD', name })
    },
    updateBusinessProfile (guid, revenue, date) {
      dispatch({ type: 'UPDATE_BUSINESS_PROFILE', guid, revenue, date })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextBestActionAside)
