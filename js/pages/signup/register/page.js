import React, { Component } from 'react'
import { connect } from 'react-redux'

import BasicPage from '../../../common/containers/basic-page'

import PremiumPromo from './components/premium-promo.js'
import Aside from './components/aside.js'
import Disclaimers from './components/disclaimers.js'
import BureauLogos from './components/bureau-logos.js'
import PasswordHelpText from './components/password-help-text'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: this.props.email || '',
      password: '',
      processing: false,
      showPassword: false
    }
  }

  render () {
    const { errors, planCode } = this.props

    let warnings = null

    if (errors) {
      warnings = errors.map((error, index) => {
        return <p key={index}><span className='fa fa-warning' />{error}</p>
      })
    }

    let loader = ''

    if (this.state.processing) {
      loader = (
        <div className='c-loader-overlay'>
          <div className='c-loader-circle'>
            <div className='c-loader-circle__border' />
          </div>
          <h3>Processing...</h3>
        </div>
      )
    }

    let headerText = `No credit card required to get a summary of your credit
      information. Checking your scores won't hurt your credit.`

    let bulletPoints = (
      <ul className='c-flush-bullet-list _hide-bullet-list-on-mobile'>
        <li>Your Personal credit score and report</li>
        <li>Business credit summary reports</li>
        <li>24/7 Monitoring</li>
      </ul>
    )

    if (planCode !== 'freemium') {
      headerText = `Nav’s premium accounts ensure things are smooth when you need
        financing and protects your business from fraud.`

      bulletPoints = (
        <ul className='c-flush-bullet-list _hide-bullet-list-on-mobile'>
          <li>Business credit reports that show what risk you pose to lenders and vendors.</li>
          <li>Personal credit reports that business lenders can use to evaluate you.</li>
          <li>$1 million personal identity theft insurance to help you avoid business disruption</li>
          <li>Credit report tracking of other businesses to make sure you’ll get paid</li>
        </ul>
      )
    }

    return (
      <div className='o-new-page'>
        <div className='o-site-container'>
          <h2 className='c-page-header c-signup-page__sign-in-link'>
            Account Setup
            <p>
              <span>Already a member? </span>
              <a href='/login'>Sign in</a>
            </p>
          </h2>

          <div className='c-signup-content'>
            <div className='o-container o-container--xl-spacing'>
              <div className='o-section'>
                <div className='c-signup-section'>
                  <div>
                    <div className='c-signup-section__header'>
                      <h2>Let's get started</h2>
                      <p>
                        {headerText}
                      </p>
                    </div>

                    <div className='c-signup-section__content'>
                      <ul className='c-flush-bullet-list _hide-bullet-list-on-mobile'>
                        {bulletPoints}
                      </ul>
                    </div>
                  </div>

                  <div className='c-form-validate'>{warnings}</div>

                  <PasswordHelpText password={this.state.password} />

                  <form
                    ref={(el) => { this.registerForm = el }}
                    onSubmit={this.submitForm.bind(this)}
                    name='registerForm'
                    action={this.props.formAction}
                    method='POST'
                    className={`o-form o-form--no-margin`}
                    noValidate>
                    <div className='c-input-wrapper'>
                      <input
                        type='email'
                        className='c-input-wrapper__field'
                        name='email'
                        value={this.state.email}
                        autoFocus={!this.state.email}
                        onChange={this.handleChange.bind(this)}
                        required />
                      <label>Email</label>
                    </div>

                    <div className='c-input-wrapper'>
                      <input
                        type={this.state.showPassword ? 'text' : 'password'}
                        className='c-input-wrapper__field'
                        name='password'
                        value={this.state.password}
                        autoFocus={!!this.state.email}
                        onChange={this.handleChange.bind(this)}
                        required />
                      <label>Create Password</label>
                      <p
                        className='c-password-show'
                        onClick={this.showPassword.bind(this)}>
                        Show
                      </p>
                    </div>

                    <button
                      className='c-btn c-btn--xl c-btn--primary'
                      disabled={this.state.processing}
                      type='submit' >
                      Continue
                    </button>

                    <p>
                      <span className='fa fa-lock c-lock-icon' /> Your
                      information is protected with bank-level encryption.
                    </p>

                    {loader}
                  </form>

                  <Disclaimers />

                  <BureauLogos />
                </div>
                <PremiumPromo
                  premiumPromo={this.props.location.premium_promo} />
              </div>

              <Aside />
            </div>
          </div>
        </div>
      </div>
    )
  }

  showPassword () {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitForm (event) {
    event.preventDefault()

    this.setState({ processing: true })

    this.registerForm.submit()
  }
}

function mapStateToProps ({ email, errors, formAction, location, planCode }) {
  return { email, errors, formAction, location, planCode }
}

module.exports = exports.default = connect(mapStateToProps)(BasicPage(RegisterPage))
module.exports.jsFilename = 'register'
