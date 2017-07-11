import React, { Component } from 'react'

export default class SelectorYear extends Component {
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
      onFocus
    } = this.props
    const { value } = this.state

    let privateClass = (isPrivate) ? 'js-private' : ''

    return (
      <select
        className={privateClass}
        name={name}
        value={value}
        onChange={(event) => {
          this.setState({ value: event.target.value })

          onChange(event)
        }}
        onFocus={onFocus}>
        <option value='' hidden />
        {getYearOptions(dateOptions)}
      </select>
    )
  }
}

function getYearOptions (dateOptions) {
  const thisYear = new Date().getFullYear()
  const startYear = thisYear - dateOptions

  let options = []

  for (let i = thisYear; i >= startYear; i--) {
    options.push(<option key={Math.random()} value={i}>{i}</option>)
  }

  return options
}
