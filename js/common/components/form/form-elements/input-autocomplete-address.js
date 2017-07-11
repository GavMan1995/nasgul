import React, { Component } from 'react'

export default class InputAutocompleteAddress extends Component {
  render () {
    const {
      isForRecurly = false,
      name,
      onChange,
      onFocus,
      value
    } = this.props

    let privateClass = (isForRecurly) ? 'js-private' : ''
    let recurlyTag = (isForRecurly) ? 'month' : ''

    return (
      <input
        type='text'
        className={privateClass}
        data-recurly={recurlyTag}
        id='autocomplete'
        name={name}
        value={value}
        placeholder=''
        onChange={onChange}
        onFocus={onFocus} />
    )
  }

  componentDidMount () {
    this.googleMaps = (window.google && window.google.maps)

    if (!this.googleMaps) {
      if (console) console.error('Google map api was not found in the page.')

      return
    }

    const input = document.getElementById('autocomplete')
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'us' }
    }

    this.autocomplete = new this.googleMaps.places.Autocomplete(input, options)
    this.autocomplete.addListener('place_changed', this.chooseAddress.bind(this))

    // stop "enter" from submitting on dropdown
    input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) e.preventDefault()
    })
  }

  chooseAddress () {
    const { updateAddressState } = this.props
    const place = this.autocomplete.getPlace()

    // get out of here if there is a problem getting data from the api
    if (!place || !Array.isArray(place.address_components)) return

    const componentForm = {
      street_number: 'short_name', // address1 first part
      route: 'long_name', // address1 second part
      locality: 'long_name', // city
      administrative_area_level_1: 'short_name', // state
      postal_code: 'short_name' // zip
    }
    const address = {}

    place.address_components.map((component) => {
      const addressType = component.types[0]

      if (componentForm[addressType]) {
        const val = component[componentForm[addressType]]
        address[addressType] = val
      }
    })

    // Set defaults
    const city = address.locality || ''
    const state = address.administrative_area_level_1 || ''
    const zip = address.postal_code || ''

    const streetParts = []

    if (address.street_number) streetParts.push(address.street_number)

    if (address.route) streetParts.push(address.route)

    const street1 = streetParts.join(' ')

    const formattedAddress = {
      city,
      state,
      street1,
      zip
    }

    updateAddressState(formattedAddress)
  }
}
