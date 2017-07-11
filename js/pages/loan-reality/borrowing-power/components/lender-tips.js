import React from 'react'

export default function LenderTips ({ reportItems }) {
  return (
    <div className='c-card c-loan-reality-card'>
      <h3 className='c-loan-reality-card__title'>
        What lenders care about most:
      </h3>
      <div className='c-loan-reality-card__borrowing-power-checkmark-wrapper'>
        {reportItems.slice(0, 3).map((item, index) => {
          return (
            <li
              key={index}
              className={listImage(item)}>
              <span />{item.textValue} {item.schema.name}
            </li>
          )
        })}
      </div>
      <div className='c-loan-reality-card__answer-error' />
    </div>
  )
}

function listImage (item) {
  if (item.points > 50) {
    return 'c-loan-reality-card__borrowing-power-checkmark-list--good'
  }

  return 'c-loan-reality-card__borrowing-power-checkmark-list--bad'
}
