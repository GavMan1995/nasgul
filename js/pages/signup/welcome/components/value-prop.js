import React from 'react'
import CdnIcon from '../../../../common/components/cdn-icon'

export default function ValueProp (props) {
  const { alignment, copy, color, icon } = props

  let classes = ['c-value-prop-box']

  if (alignment === 'right') classes.push('c-value-prop-box--right-aligned')
  if (color === 1) classes.push('c-value-prop-box--color-1')
  if (color === 2) classes.push('c-value-prop-box--color-2')
  if (color === 3) classes.push('c-value-prop-box--color-3')
  if (color === 4) classes.push('c-value-prop-box--color-4')
  classes = classes.join(' ')

  return (
    <div className={classes}>
      <div className='c-value-prop-box__icon'>
        <CdnIcon filename={icon} />
      </div>
      <p>{copy}</p>
    </div>
  )
}
