import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

import FeatureFlag from '../../../../common/components/feature-flag'

import ActionLink from './action-link'

class QualifierSmall extends Component {
  constructor (props) {
    super(props)

    this.state = { isOpen: false, detailsHeight: 0 }
  }

  // Use scrollHeight and not offsetHeight to find the height of the parent element
  _toggleDetails () {
    const element = findDOMNode(this)
    const details = element.querySelector('.js-MatchFactorDescription')
    const height = Math.ceil(details.scrollHeight)

    if (!this.state.isOpen) {
      // the adding 8 is padding, scrollHeight didn't calc the bottom padding
      this.setState({ isOpen: true, detailsHeight: height + 8 })
    } else {
      this.setState({ isOpen: false, detailsHeight: 0 })
    }
  }

  render () {
    const { plan, qualifier, size } = this.props

    let qualIcon = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/mf-factor_missing-info_20x20.svg' className='c-mf-factor__icon' />

    if (qualifier.view_data.qualifies === true) {
      qualIcon = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/mf-factor_success_20x20.svg' className='c-mf-factor__icon' />
    }

    if (qualifier.view_data.qualifies === false) {
      qualIcon = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/mf-factor_fail_20x20.svg' className='c-mf-factor__icon' />
    }

    if (qualifier.data_param === undefined) {
      qualIcon = <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/mf-factor_missing-info_20x20.svg' className='c-mf-factor__icon' />
    }

    let html = (
      <div className={`c-mf-factor ${this.state.isOpen ? 'is-open' : ''}`}>
        <div className='c-mf-factor__header' onClick={this._toggleDetails.bind(this)}>
          {qualIcon}
          <p>
            {qualifier.view_data.title}:&nbsp;
            <span>{qualifier.view_data.data_param}</span>
          </p>
          <img
            src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/chevron_20x10.svg'
            className='c-mf-factor__chevron' />
        </div>
        <p
          className='c-mf-factor__description js-MatchFactorDescription'
          style={{maxHeight: `${this.state.detailsHeight}px`}}>
          <span><strong>{qualifier.view_data.message.short}</strong></span>&nbsp;
          {qualifier.view_data.message.long}

          <FeatureFlag
            flagName='mf_qualifier_link'
            on={(<ActionLink type={qualifier.type} plan={plan} />)} />
        </p>
      </div>
    )

    if (size === 'small') {
      html = (
        <li>
          {qualIcon}
          {qualifier.view_data.title}
        </li>
      )
    }

    return html
  }
}

function mapStateToProps ({ plan }) {
  return { plan }
}

export default connect(mapStateToProps)(QualifierSmall)
