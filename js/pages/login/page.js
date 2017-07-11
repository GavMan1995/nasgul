import React from 'react'
import { connect } from 'react-redux'

import BasicPage from '../../common/containers/basic-page'

function LoginPage ({ authBaseUrl, crumb, email }) {
  return (
    <div className='c-auth-form'>
      <form
        className='c-auth-form__form'
        method='POST'
        onSubmit={() => {
          window.analytics.track('feature_click', {
            category: 'internal_link',
            label: 'login_page:submit_form',
            name: 'login_page:submit_form'
          })
        }}
        noValidate>
        <input type='hidden' name='crumb' value={crumb} />

        <div className='c-auth-form__input-field'>
          <label htmlFor='session_email'>Email</label>
          <input
            type='email'
            id='session_email'
            className='qa-auth__username'
            name='session[email]'
            defaultValue={email}
            autoFocus={!email}
            required />
        </div>

        <div className='c-auth-form__input-field'>
          <label htmlFor='session_password'>Password</label>
          <input
            type='password'
            className='qa-auth__password'
            id='session_password'
            name='session[password]'
            autoFocus={!!email}
            required />
        </div>

        <button
          type='submit'
          className='c-btn c-btn--xl c-auth-form__submit qa-auth__submit'>
          Log In
        </button>
      </form>

      <div className='c-auth-form__links'>
        <a
          href='https://www.nav.com/pricing'
          onClick={() => {
            window.analytics.track('feature_click', {
              category: 'internal_link',
              label: 'login_page:create_account',
              name: 'login_page:create_account'
            })
          }}>
          Create Account
        </a>

        <a
          href={`${authBaseUrl}/password_resets/new`}
          className='qa-auth__reset-password'
          onClick={() => {
            window.analytics.track('feature_click', {
              category: 'internal_link',
              label: 'login_page:forgot_password',
              name: 'login_page:forgot_password'
            })
          }}>
          Forgot Password?
        </a>
      </div>
    </div>
  )
}

function mapStateToProps ({ authBaseUrl, crumb, email }) {
  return { authBaseUrl, crumb, email }
}

module.exports = exports.default = connect(mapStateToProps)(BasicPage(LoginPage, {
  isNavbarFixed: true
}))
module.exports.jsFilename = 'login'
