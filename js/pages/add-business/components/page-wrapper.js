import React, { Component } from 'react'

import CDNIllustration from '../../../common/components/cdn-illustration'

export default class PageWrapper extends Component {
  render () {
    const {
      imgLarge,
      imgSmall,
      isLargeImg,
      headerText
    } = this.props

    let large = imgLarge || 'business_light-blue_190x190.svg'
    let small = imgSmall || 'business_light-blue_72x72.svg'
    let header = null

    if (headerText) header = <h1>{headerText}</h1>

    let classes = ['c-add-business-flow__header']

    if (isLargeImg) classes.push('c-add-business-flow__header--large-image')

    classes = classes.join(' ')

    return (
      <div className='o-new-page o-new-page--white'>
        <div className='c-add-business-flow'>
          <CDNIllustration
            className='c-add-business-flow__desktop-img'
            width='190'
            filename={large} />
          <div className='c-add-business-flow__content'>
            <div className={classes}>
              <CDNIllustration
                className='c-add-business-flow__header-large-img'
                width='190'
                filename={large} />
              <CDNIllustration width='72' filename={small} />
              {header}
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
