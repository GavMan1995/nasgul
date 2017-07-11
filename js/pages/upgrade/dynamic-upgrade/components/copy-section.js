import React from 'react'

import CDNIcon from '../../../../common/components/cdn-icon'

export default function CopySection (props) {
  const { copy } = props

  return (
    <div className='c-upgrade-form-info-container'>
      <div className='c-upgrade-form-info-container__header'>
        <h2>
          <strong>
            Nav {copy.planName}
          </strong>
        </h2>
        {copy.description && copy.description.map((paragraph, index) => {
          return <p key={index}>{paragraph}</p>
        })}
      </div>

      <div className='c-upgrade-form-info'>
        <h4><strong>{copy.featureList.title}</strong></h4>
        <ul className='c-upgrade-form-info__list'>
          {copy.featureList.list && copy.featureList.list.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>

      <div className='c-upgrade-form-info'>
        <h4><strong>{copy.reportList.title}</strong></h4>
        <div className='c-upgrade-form-info__icon-list'>
          {copy.reportList.list && copy.reportList.list.map((item, index) => {
            return (
              <div className='c-upgrade-form-info__icon-list-item' key={index}>
                <CDNIcon filename={item.img} />
                <p>{item.copy}</p>
              </div>
            )
          })}
        </div>
      </div>

      <h3><strong>{copy.valueProp.boldText}</strong> {copy.valueProp.copy}</h3>
      <p
        className='c-dynamic-upgrade-page__discliamer'>
        {copy.valueProp.disclaimer}
      </p>
    </div>
  )
}
