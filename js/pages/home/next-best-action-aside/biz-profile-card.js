import React, { Component } from 'react'

import LoaderCard from '../../../common/components/loader-card'

import VMasker from 'vanilla-masker'

export default class BizProfileCard extends Component {
  constructor (props) {
    super(props)

    this.state = { annual_gross_revenue: '', start_date: '' }
  }

  render () {
    if (!this.props.activeProfileLoaded) {
      return <LoaderCard text='Retreiving profile...' />
    }

    return (
      <div className='c-next-best-action-aside__content-card is-active'>
        <div className='c-next-best-action-aside__content'>
          <p>Add your info, get better results</p>
          <form className='o-form'>
            <div className='o-input-wrapper o-input-wrapper--simple o-input-wrapper--sm o-input-wrapper--full-width'>
              <input
                type='text'
                name='start_date'
                maxLength='10'
                ref={(el) => { this.startDate = el }}
                value={this.state.start_date}
                placeholder='MM-DD-YYYY'
                onChange={this.handleChange.bind(this)} />
              <label>Business Start Date</label>
            </div>

            <div className='o-input-wrapper o-input-wrapper--simple o-input-wrapper--sm o-input-wrapper--full-width'>
              <input
                type='text'
                name='annual_gross_revenue'
                maxLength='13'
                ref={(el) => { this.annualGrossRevenue = el }}
                value={this.state.annual_gross_revenue}
                placeholder='$'
                onChange={this.handleChange.bind(this)} />
              <label>Annual Revenue</label>
            </div>
          </form>
        </div>

        <button
          className='c-btn c-btn--white c-btn--no-margin c-btn--lg'
          disabled={this.props.savingProfile}
          onClick={this.handleClick.bind(this)}>
          {this.props.savingProfile ? 'Saving...' : 'Add to Profile'}
        </button>
      </div>
    )
  }

  componentDidMount () {
    this.props.fetchBusinessProfile()
  }

  componentDidUpdate () {
    if (this.annualGrossRevenue && this.startDate) {
      VMasker(this.annualGrossRevenue).maskMoney({
        delimiter: ',',
        precision: 0,
        unit: '$'
      })

      VMasker(this.startDate).maskPattern('99-99-9999')
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      annual_gross_revenue: nextProps.activeProfile.annual_gross_revenue,
      start_date: startDate(nextProps.activeProfile.start_date)
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick (event) {
    event.preventDefault()

    window.analytics.track('feature_click', {
      category: 'internal_link',
      label: 'biz_profile_nba:save_profile',
      name: 'biz_profile_nba:save_profile'
    })

    let hasError = false

    removeErrorClass(this.annualGrossRevenue)
    removeErrorClass(this.startDate)

    if (this.state.annual_gross_revenue === '') {
      hasError = true

      addErrorClass(this.annualGrossRevenue)
    }

    if (this.state.start_date === '') {
      hasError = true

      addErrorClass(this.startDate)
    }

    if (!hasError) {
      this.props.setCurrentCard('saving_card')

      this.props.updateBusinessProfile(
        this.props.activeProfile.guid,
        this.state.annual_gross_revenue,
        this.state.start_date
      )
    }
  }
}

function addErrorClass (element) {
  element.parentNode.classList.add('has-error')
}

function removeErrorClass (element) {
  element.parentNode.classList.remove('has-error')
}

function startDate (string) {
  const pattern = /^(\d{4})-(\d{2})-(\d{2})$/
  const match = pattern.exec(string)

  if (match) {
    return `${match[2]}-${match[3]}-${match[1]}`
  } else {
    return ''
  }
}
