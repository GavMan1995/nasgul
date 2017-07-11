import React, { Component } from 'react'

export default class Circle extends Component {
  render () {
    if (this.props.offset === 0) return null

    return (
      <div className='donut-chart'>
        <svg width={32} height={32}>
          <g>
            <circle
              ref={(el) => { this.circle = el }}
              r={15.5}
              cx={16}
              cy={16}
              fill='none'
              stroke='#0091EA'
              strokeWidth={1}
              strokeDasharray={97.34}
              strokeDashoffset={offset(this.props.offset)} />
          </g>
        </svg>
      </div>
    )
  }

  componentDidMount () {
    setTimeout(() => {
      const element = this.circl

      if (element) {
        element.setAttribute('stroke-dashoffset', this.props.offset)
      }
    }, 1)
  }
}

function offset (value) {
  if (value === 0) return 0

  if (!value) return 97.34

  return value
}
