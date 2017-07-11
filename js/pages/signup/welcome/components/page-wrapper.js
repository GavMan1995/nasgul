import React, { Component } from 'react'

import CDNIllustration from '../../../../common/components/cdn-illustration'

export default class PageWrapper extends Component {
  render () {
    const {
      imgLarge,
      imgSmall,
      headerText
    } = this.props

    let header = (headerText) ? <h1>{headerText}</h1> : null

    return (
      <div className='o-new-page o-new-page--white'>
        <div className='c-add-business-flow'>
          <CDNIllustration
            className='c-add-business-flow__desktop-img'
            width='190'
            filename={imgLarge} />
          <div className='c-add-business-flow__content'>
            <div className='c-add-business-flow__header c-add-business-flow__header--large-image'>
              <CDNIllustration
                className='c-add-business-flow__header-large-img'
                width='190'
                filename={imgLarge} />
              <CDNIllustration width='72' filename={imgSmall} />
              {header}
            </div>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
