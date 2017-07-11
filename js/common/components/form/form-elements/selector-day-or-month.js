import React, { Component } from 'react'

export default class SelectorDayOrMonth extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.value || '' }
  }

  render () {
    const {
      dateOptions,
      isPrivate = false,
      name,
      onChange,
      onFocus,
      recurlyTag
    } = this.props
    const { value } = this.state

    let privateClass = (isPrivate) ? 'js-private' : ''

    return (
      <select
        className={privateClass}
        data-recurly={recurlyTag}
        name={name}
        value={value}
        onChange={(event) => {
          this.setState({ value: event.target.value })

          onChange(event)
        }}
        onFocus={onFocus}>
        <option value='' hidden />
        {getDateOptions(dateOptions)}
      </select>
    )
  }
}

function getDateOptions (qty) {
  let options = []

  for (let i = 1; i <= qty; i++) {
    const display = (i < 10) ? `0${i}` : i
    options.push(<option key={Math.random()} value={display}>{display}</option>)
  }

  return options
}
