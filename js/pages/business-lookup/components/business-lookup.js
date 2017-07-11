import React, { Component } from 'react'

export default class BusinessLookup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zipHasValue: false,
      bizHasValue: false
    }
  }

  render () {
    return (
      <div className='c-biz-lookup__lookup'>
        <p>
          Instantly see a free snapshot of any client’s business
          credit report. You can also share it with one click, and
          help them build their credit profile.
        </p>
        <form
          className='o-form'
          onSubmit={this.lookup.bind(this)}>
          <div className={`c-input-wrapper c-input-wrapper--half ${this.state.bizHasValue ? 'has-value' : ''}`}>
            <label>Business Name</label>
            <input
              type='text'
              ref='name'
              onChange={this.checkValueBiz.bind(this)}
              autoComplete='off' />
          </div>

          <div className={`c-input-wrapper c-input-wrapper--half ${this.state.zipHasValue ? 'has-value' : ''}`}>
            <label>Zip Code</label>
            <input
              type='text'
              ref='zip'
              maxLength='5'
              onChange={this.checkValueZip.bind(this)}
              autoComplete='off' />
          </div>
          <div className='c-biz-lookup__btn-wrapper'>
            <button
              className='c-btn c-btn--xl c-btn--primary c-btn--mobile'
              type='submit'>
              Look Up Business
            </button>
          </div>
        </form>
      </div>
    )
  }

  checkValueZip (event) {
    if (event.target.value !== '') {
      this.setState({zipHasValue: true})
    } else {
      this.setState({zipHasValue: false})
    }
  }

  checkValueBiz (event) {
    if (event.target.value !== '') {
      this.setState({bizHasValue: true})
    } else {
      this.setState({bizHasValue: false})
    }
  }

  lookup (event) {
    event.preventDefault()
    let name = this.refs.name.value
    let zip = this.refs.zip.value

    this.props.lookupBusiness(name, zip)
  }
}
