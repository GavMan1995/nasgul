import React from 'react'

import CDNLogo from '../../../../common/components/cdn-logo'

export default function BrandingImage ({ business }) {
  if (!business || !business.branding_image_url) {
    return (
      <CDNLogo
        className='c-enterprise__partner-logo'
        filename='credit-suite-logo.png' />
    )
  }

  return <img className='c-enterprise__partner-logo' src={business.branding_image_url} />
}
