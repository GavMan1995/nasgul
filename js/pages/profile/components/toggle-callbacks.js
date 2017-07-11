import React, { Component } from 'react'

export default function ToggleCallbacks (ComposedComponent) {
  return class extends Component {
    constructor (props) {
      super(props)

      this.state = { wasToggled: !!this.props.defaultValue }
    }

    render () {
      return (
        <ComposedComponent
          {...this.props}
          changeCallback={this.toggledCallback.bind(this)} />
      )
    }

    toggledCallback (event) {
      if (!this.state.wasToggled && event.target.value !== '') {
        this.props.increment()

        this.setState({ wasToggled: true })
      }

      if (this.state.wasToggled && event.target.value === '') {
        this.props.decrement()

        this.setState({ wasToggled: false })
      }
    }
  }
}
