import React, { Component } from 'react'
import { connect } from 'react-redux'

class HelloWorldPage extends Component {
  render () {
    return (
      <div style={{
        margin: '24px',
        backgroundColor: '#fff',
        color: '#4D5661',
        boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          marginBottom: '24px',
          padding: '32px 0',
          backgroundColor: '#00BB7B',
          fontSize: '40px',
          fontWeight: 400,
          fontStyle: 'italic',
          textAlign: 'center',
          color: '#fff'
        }}>
          We hear you loud and clear, welcome aboard!
        </h1>
        <h3 style={{
          margin: '0 24px',
          borderBottom: '1px solid #E0E3E7'
        }}>
          Provided Data
        </h3>
        <pre style={{ padding: '0 24px 24px' }}>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      </div>
    )
  }
}

function mapStateToProps ({ business }) {
  return { business }
}

module.exports = exports.default = connect(mapStateToProps)(HelloWorldPage)
module.exports.jsFilename = 'hello-world'
