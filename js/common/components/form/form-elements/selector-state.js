import React, { Component } from 'react'

import stateAbbreviations from '../../../data/state-abbreviations'

export default class SelectorState extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.value || '' }
  }

  render () {
    const {
      name = 'state',
      isPrivate = false,
      className,
      onChange,
      onFocus
    } = this.props
    const { value } = this.state

    let classes = [className]

    if (isPrivate) classes.push('js-private')

    classes = classes.join(' ')

    return (
      <select
        className={classes}
        name={name}
        value={value}
        onChange={(event) => {
          this.setState({ value: event.target.value })

          onChange(event)
        }}
        onFocus={onFocus}>
        <option value='' hidden />
        {stateAbbreviations.map((state) => {
          return <option key={state} value={state}>{state}</option>
        })}
      </select>
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== '') this.setState({ value: nextProps.value })
  }
}
