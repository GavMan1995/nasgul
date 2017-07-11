import React, { Component } from 'react'
import { connect } from 'react-redux'

class CreditTargetOffer extends Component {
  constructor (props) {
    super(props)

    this.state = { offers: [] }
  }

  render () {
    const { config } = this.props
    const { offers } = this.state

    if (offers.length === 0) return null

    return (
      <div data-flex--container>
        <div data-flex--item='full p-t--md p-b--sm' className='font-bold'>
          {config.header}
        </div>
        <div data-flex--item='full' data-flex--container='true'>
          <div data-flex--item='basis--75 grow--1 m-r--md p-b--sm'>
            {config.subHeader}
          </div>
          {offers.map((offer, index) => {
            return (
              <div
                key={index}
                data-flex--item='basis--300 grow--1 p-x--sm'
                data-flex--container='true'>
                <a
                  data-flex--item='basis--200 grow--1 p-b--sm p-t--sm'
                  data-flex--container='true'
                  href={offer.offer_link || config.backupLink}
                  target={offer.has_details ? '_self' : '_blank'}>
                  <div data-flex--item='basis--100 p-x--sm'>
                    <img src={offer.hr_image_url} className='credit-target-card' />
                  </div>
                  <p className='font-xs' data-flex--item='basis--100 grow--1'>
                    {offer.title}
                  </p>
                </a>
              </div>
            )
          })}
          <div
            data-flex--item='basis--100 pull--right m-l--md'
            data-flex--container='row-items__top'>
            <a
              data-flex--item='pull--right'
              className='btn btn-secondary'
              href='/market/lending-offers?traits[]=Credit%20Builder:Credit%20Builder'
              target='_self'>
              See All
            </a>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount () {
    const { config } = this.props

    window.fetch(`/client/api/v2/personal_offers${searchParams(config)}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': this.props.crumb
      },
      credentials: 'include'
    }).then((response) => {
      if (response.ok) return response.json()

      if (response.status === 401) window.location.reload(true)
    }).then((response) => {
      if (!response) return

      if (response.errors && response.errors.length > 0) return

      this.setState({ offers: response.data || [] })
    })
  }
}

function searchParams (config) {
  let result = `?category=${config.category}&limit=2`

  if (config.traitKey && config.traitValue) {
    result += `&${config.traitKey}[]=${config.traitValue}`
  }

  return result
}

function mapStateToProps ({ crumb }) {
  return { crumb }
}

export default connect(mapStateToProps)(CreditTargetOffer)
