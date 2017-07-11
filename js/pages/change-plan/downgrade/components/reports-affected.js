import React from 'react'

export default function ReportsAffected () {
  return (
    <div className='o-site-container'>
      <div className='c-downgrade-reports-affected'>
        <h3 className='c-downgrade-details__panel-header c-downgrade-details__panel-header--poor'>
          Reports This Change Affects
        </h3>
        <div className='c-bureau-image-container'>
          <div className='c-bureau-image'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/images/experian-logo.png' />
          </div>

          <div className='c-bureau-image'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/images/transunion-logo.png' />
          </div>

          <div className='c-bureau-image'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/images/dandb-logo.png' />
          </div>

          <div className='c-bureau-image'>
            <img src='https://dxkdvuv3hanyu.cloudfront.net/images/fico-logo.png' />
          </div>
        </div>
      </div>
    </div>
  )
}
