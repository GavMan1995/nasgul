import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoadingOverlay from '../../components/loading-overlay'

class AddBusinessPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      isSimilarSelected: false,
      selectedSimilar: ''
    }
  }

  render () {
    const {
      isLoading,
      isSimilarSelected,
      selectedSimilar
    } = this.state
    const { bureauLogo, businessInfo, crumb, similars, signupPlan } = this.props
    const { bureau, id, isOwned, name, zip } = businessInfo
    const { allSimilars } = similars

    let nextStep = `/add-business/similars?bureau=dandb&id=${id}&isOwned=${isOwned}&name=${name}&zip=${zip}`

    if (bureau === 'dandb') {
      if (signupPlan && signupPlan !== 'freemium') {
        nextStep = `/billing`
      } else {
        nextStep = `/add-business/complete?id=${id}`
      }
    }

    let selectSimilarButton = null

    if (isSimilarSelected) {
      selectSimilarButton = (
        <button
          type='sumbit'
          className='c-btn c-btn--primary'>
          That's My Business
        </button>
      )
    }

    let loader = null

    if (isLoading) loader = <LoadingOverlay />

    return (
      <form
        method='POST'
        action='/add-business/similars'
        onSubmit={this.setLoading.bind(this)}
        noValidate
        className='c-floating-card'>
        <input type='hidden' name='crumb' value={crumb} />
        <input type='hidden' name='similar' value={selectedSimilar} />
        <input type='hidden' name='businessInfo' value={JSON.stringify(businessInfo)} />

        <div className='c-floating-card__header'>{bureauLogo}</div>

        <div className='c-floating-card__content'>
          <h4>Is your business on this list?</h4>
          {allSimilars.sort((a, b) => {
            const businessInfoA = `${a.address}${a.city}${a.state}${a.zip}`
            const businessInfoB = `${b.address}${b.city}${b.state}${b.zip}`
            return businessInfoA - businessInfoB
          }).map((similar, position, array) => {
            let isChecked
            if (JSON.stringify(similar) === selectedSimilar) {
              isChecked = 'checked'
            }
            if (!position || JSON.stringify(similar) !== JSON.stringify(array[position - 1])) {
              return (
                <div className='c-add-business-flow__similar' key={`${Math.random()}`}>
                  <input
                    className='c-radio c-radio--primary c-radio--large'
                    type='radio'
                    name='selectedSimilar'
                    value={JSON.stringify(similar)}
                    onClick={this.isSimilarSelected.bind(this)}
                    defaultChecked={isChecked}
                    style={{ cursor: 'pointer' }} />
                  <label htmlFor='test' />
                  <div className='c-add-business-flow__similar-address'>
                    <strong>{similar.name}</strong>
                    <p>{similar.address}<span>,</span></p>
                    <p>{similar.city}, {similar.state} {similar.zip}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <div className='c-floating-card__footer'>
          <div className='c-btn-group-on-mobile-wrapper'>
            <a
              href={nextStep}
              className='c-btn c-add-business-flow__link'
              onClick={() => this.noSimilarFound()}>
              My Business Is Not Here
            </a>
            {selectSimilarButton}
          </div>
        </div>

        {loader}
      </form>
    )
  }

  noSimilarFound () {
    window.analytics.track('Business Not Found', {
      name: this.props.location.query.bureau,
      label: this.props.location.query.bureau,
      category: 'Add Business Interaction'
    })
  }

  isSimilarSelected (event) {
    if (!this.state.isSimilarSelected) { this.setState({ isSimilarSelected: true }) }
    this.setState({ selectedSimilar: event.target.value })
  }

  setLoading () {
    this.setState({isLoading: true})
  }
}

function mapStateToProps ({ crumb, location, similars, signupPlan }) {
  return { crumb, location, similars, signupPlan }
}

export default connect(mapStateToProps)(AddBusinessPage)
