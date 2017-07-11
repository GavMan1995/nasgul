import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingOverlay from '../../components/loading-overlay'

class VerifyBestSimilar extends Component {
  constructor () {
    super()

    this.state = {
      isLoading: false
    }
  }

  render () {
    const {
      crumb,
      similars,
      bureauLogo,
      bureauName,
      viewSimilars,
      businessInfo
    } = this.props
    const { isLoading } = this.state
    const { bestSimilar } = similars

    let loader = null

    if (isLoading) loader = <LoadingOverlay />

    return (
      <form
        method='POST'
        action='/add-business/similars'
        onSubmit={this.setLoading.bind(this)}
        noValidate>
        <div className='c-floating-card'>
          <input type='hidden' name='crumb' value={crumb} />
          <input type='hidden' name='similar' value={JSON.stringify(bestSimilar)} />
          <input type='hidden' name='businessInfo' value={JSON.stringify(businessInfo)} />
          <div className='c-floating-card__header'>{bureauLogo}</div>
          <div className='c-floating-card__content'>
            <p>We found the following {bureauName} profile:</p>
            <div className='c-address-listing'>
              <p><strong>{bestSimilar.name}</strong></p>
              <p>{bestSimilar.address}<span>,</span></p>
              <p>{bestSimilar.city}, {bestSimilar.state} {bestSimilar.zip}</p>
            </div>
          </div>
          <div className='c-floating-card__footer'>
            <div className='c-btn-group-on-mobile-wrapper'>
              <h4>Is This Your Business?</h4>
              <button
                className='c-btn c-btn--primary'
                onClick={() => this.verifyBestSimilar('correctInfo')}
                type='submit'>
                Yes
              </button>
              <button
                className='c-btn c-btn--primary c-btn--outline'
                onClick={viewSimilars}
                type='button'>
                No
              </button>
            </div>
          </div>
          {loader}
        </div>
        <button
          className='c-add-business-flow__incorrect-info-button'
          onClick={() => this.verifyBestSimilar('incorrectInfo')}
          type='submit'>
          Yes, but some of the information is incorrect
        </button>
      </form>
    )
  }

  verifyBestSimilar (isCorrectInfo) {
    const { bureau } = this.props.businessInfo

    let category
    if (isCorrectInfo === 'correctInfo') {
      category = 'Add Business Interaction'
    }
    if (isCorrectInfo === 'incorrectInfo') {
      category = 'Add Business Interaction - Incorrect Info'
    }

    window.analytics.track('Selected Similar', {
      name: bureau,
      label: bureau,
      category: category
    })
  }

  setLoading () {
    this.setState({isLoading: true})
  }
}

function mapStateToProps ({ crumb, location, similars }) {
  return { crumb, location, similars }
}

export default connect(mapStateToProps)(VerifyBestSimilar)
