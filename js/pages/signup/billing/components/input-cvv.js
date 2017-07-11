import React, { Component } from 'react'

import VMasker from 'vanilla-masker'

import StyleWrapper from '../../../../common/components/form/form-elements/style-wrapper'

export default class InputCVV extends Component {
  constructor (props) {
    super(props)

    this.state = { value: props.value || '' }
  }

  render () {
    const {
      customBasis,
      customClasses,
      label,
      name,
      isInvalid,
      onChange,
      onFocus
    } = this.props
    const { value } = this.state

    return (
      <StyleWrapper
        customBasis={customBasis}
        customClasses={customClasses}
        isInvalid={isInvalid}
        hasValue={value}
        label={label}
        type='input'>
        <input
          ref={(element) => { this.input = element }}
          className='js-private'
          data-recurly='cvv'
          maxLength='4'
          name={name}
          placeholder=''
          type='text'
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value })

            onChange(event)
          }}
          onFocus={onFocus} />
      </StyleWrapper>
    )
  }
  componentDidMount () {
    const input = this.input
    VMasker(input).maskPattern('9999')
  }

  componentDidUpdate () {
    const input = this.input
    VMasker(input).maskPattern('9999')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== '') this.setState({ value: nextProps.value })
  }
}
