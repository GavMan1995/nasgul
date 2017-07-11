import React from 'react'
import Radio from '../../../../../common/components/form/form-elements/radio'

export default function MfaOptions ({ params }) {
  const { id, label, options } = params

  return (
    <div className='c-loan-reality-card__options-container'>
      <label>{label}</label>
      {options.map((item) => {
        return (
          <Radio
            key={item.id}
            id={item.id}
            name={id}
            label={item.label}
            value={item.value} />
        )
      })}
    </div>
  )
}
