import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import FactBox from './fact-box'

export default class OfferDetailsOverview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      detailsHeight: '',
      isOpen: false
    }
  }

  render () {
    const { offerType } = this.props

    let verdictIcon = ''
    if (Object.keys(offerType).length > 0) {
      if (offerType.detail.verdict.icon) {
        verdictIcon = <img src={offerType.detail.verdict.icon} />
      } else {
        verdictIcon = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/not-so-fine-print_80x80.svg' />
      }
    }

    return (
      <div className='c-offer-details-overview'>
        <div
          className='c-offer-details-overview__content'
          style={{maxHeight: this.state.isOpen ? `${this.state.detailsHeight}px` : ''}}>
          <h2><strong>What is it?</strong></h2>
          <div className='c-fact-box'>
            <div className='c-fact-box__title'>
              {verdictIcon}
              <h4>{offerType.detail.verdict.title}</h4>
            </div>
            <p>{offerType.detail.verdict.description}</p>
          </div>

          {offerType.detail.sections.map((section) => {
            return <FactBox key={section.title} data={section} loanTitle={offerType.name} />
          })}
        </div>
        <div
          onClick={this.toggleDetails.bind(this)}
          className={`c-offer-details-overview__footer ${this.state.isOpen ? 'is-open' : ''}`}>
          <p>
            Read {this.state.isOpen ? 'Less' : 'More'}
          </p>
          <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg' />
        </div>
      </div>
    )
  }

  componentDidMount () {
    const element = findDOMNode(this)
    const content = element.querySelector('.c-offer-details-overview__content')
    const height = Math.ceil(content.scrollHeight)

    this.setState({ detailsHeight: height })
  }

  toggleDetails () {
    this.setState({ isOpen: !this.state.isOpen })
  }
}
