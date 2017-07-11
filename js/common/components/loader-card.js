import React from 'react'

export default function LoaderCard ({ text, loaderClass }) {
  let wrapperClass = 'c-next-best-action-aside__content-card'

  if (loaderClass) wrapperClass = loaderClass

  return (
    <div className={`${wrapperClass} is-active`}>
      <div className='c-loader-circle-container'>
        <div className='c-loader-circle'>
          <div className='c-loader-circle__border' />
        </div>
        <h3>{text}</h3>
      </div>
    </div>
  )
}
