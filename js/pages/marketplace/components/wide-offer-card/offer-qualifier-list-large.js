import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Qualifier from './qualifier'
import MatchFactor from '../match-factor'

export default class OfferQualifierListLarge extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mfOpen: false,
      contentHeight: 0
    }
  }

  render () {
    const { offer } = this.props

    return (
      <div className='o-wide-offer-card__aside-column'>
        <div className='c-mf-factor-list c-mf-factor-list--wide-card'>
          <div className='c-mf-factor-list__title'>
            <div
              className={`c-mf-score ${_matchFactorScore(offer)} c-mf-score--no-hover c-mf-score--no-chevron`}>
              <MatchFactor offer={offer} />
            </div>
            <p>
              Based on your business profile, here is how you match
              up with this financing option.
            </p>
          </div>
          <div className='c-mf-factor-list__content'
            style={this.state.mfOpen ? {maxHeight: this.state.contentHeight, padding: '16px'} : {}}>
            {offer.qualifiers.map((qualifier, index) => {
              return <Qualifier key={index} qualifier={qualifier} />
            })}
          </div>

          <div
            onClick={this.toggleMF.bind(this)}
            className={`c-mf-factor-list__expand-btn ${this.state.mfOpen ? 'is-open' : ''}`}>
            <h3>Show {this.state.mfOpen ? 'Less' : 'More'}</h3>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
          </div>
        </div>
      </div>
    )
  }

  toggleMF () {
    const element = findDOMNode(this)
    const content = element.querySelector('.c-mf-factor-list__content')
    const height = Math.ceil(content.scrollHeight)

    this.setState({
      mfOpen: !this.state.mfOpen,
      contentHeight: height + 400
    })
  }
}

const _matchFactorScore = function (offer) {
  let score = offer.relevance

  if (score > 89) {
    return 'c-mf-score--good'
  } else if (score > 79) {
    return 'c-mf-score--fair'
  } else if (score > 69) {
    return 'c-mf-score--average'
  } else if (score > 59) {
    return 'c-mf-score--low'
  } else if (score > -1) {
    return 'c-mf-score--bad'
  } else {
    return ''
  }
}
