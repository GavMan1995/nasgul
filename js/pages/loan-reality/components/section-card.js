import React, { Component } from 'react'

import CDNAsset from '../../../common/components/cdn-asset'

export default class SectionCard extends Component {
  constructor (props) {
    super(props)
    // This was going to be used to fade in the changes to the tip
    this.state = { showExtendedText: false }
  }

  render () {
    const { item, showTeaserText } = this.props

    let teaserText = ''
    let [...longText] = item.schema.description.split('\n')
    let extendedTextClass = 'c-loan-reality-card__text c-loan-reality-card__text--hide'

    if (this.state.showExtendedText) extendedTextClass = 'c-loan-reality-card__text'

    if (showTeaserText) {
      [teaserText, ...longText] = item.schema.description.split('\n')
    }

    let textValue = item.textValue

    if (item.code === 'deposits') {
      textValue = `${textValue} deposits`
    }

    return (
      <div className='c-card c-loan-reality-card'>
        <div className='c-loan-reality-card__row'>
          <div className='c-loan-reality-card__row-header'>
            <h4>Your {item.schema.name}</h4>
            <h2>
              {textValue}
            </h2>
          </div>
          <div className='c-loan-reality-card__menu-gauge-image-wrapper'>
            <CDNAsset
              className='c-loan-reality-card__small-menu-gauge-image'
              directory='images/loan-reality'
              filename={item.gaugeImage} />
            <div className={item.gaugeTextClass}>{item.gaugeText}</div>
          </div>
        </div>
        <p className='c-loan-reality-card__text'>{teaserText}</p>
        {longText.map((text, index) => {
          return (
            <p key={index} className={extendedTextClass}>
              {text}
            </p>
          )
        })}

        <button
          onClick={this.toggleText.bind(this)}
          className='c-btn c-btn-l'>
          {this.state.showExtendedText ? 'View Less' : 'View More'}
        </button>
      </div>
    )
  }

  toggleText () {
    this.setState({ showExtendedText: !this.state.showExtendedText })

    let btnText = 'view_more'

    if (this.state.showExtendedText) btnText = 'view_less'

    window.analytics.track('feature_click', {
      category: 'internal_link',
      label: `${this.props.item.code}:${btnText}`,
      name: `${this.props.item.code}:${btnText}`
    })
  }
}
