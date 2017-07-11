import React from 'react'
import { connect } from 'react-redux'

import BrandingImage from './branding-image'
import CDNIcon from '../../../../common/components/cdn-icon'

function EnterpriseHeader ({ business }) {
  return (
    <div className='o-enterprise-card c-enterprise__header'>
      <a href='https://suitelogin.com/report-dashboard/' className='c-enterprise__bread-crumb'>
        <CDNIcon filename='chevron_20x10.svg' />
        Back to Credit Suite
      </a>

      <div className='c-enterprise__header-images'>
        <BrandingImage business={business} />
        <small>powered by</small>
        <img
          className='c-enterprise__nav-logo'
          src='https://dxkdvuv3hanyu.cloudfront.net/images/nav/logo-name-blue.svg' />
      </div>
    </div>
  )
}

function mapStateToProps ({ business }) {
  return { business }
}

export default connect(mapStateToProps)(EnterpriseHeader)
