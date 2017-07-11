import React from 'react'

export default function PercentDonut (props) {
  const { bgColor, fgColor, max, strokeWidth, value, width } = props
  const radius = (width / 2) - (Math.ceil(strokeWidth / 2) + 1)
  const cx = width / 2
  const cy = width / 2
  const strokeLength = (Math.PI * (2 * radius)) * (value / max)
  const strokeGap = 360 - strokeLength

  return (
    <svg
      width={width}
      height={width}
      style={{ transform: 'rotate(-90deg)' }}>
      <g>
        <circle
          r={radius}
          cx={cx}
          cy={cy}
          fill='none'
          stroke={bgColor || '#e2e2e2'}
          strokeWidth={strokeWidth} />

        <circle
          r={radius}
          cx={cx}
          cy={cy}
          fill='none'
          stroke={fgColor || '#0091EA'}
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeLength},${strokeGap}`}
          strokeDashoffset={0} />
      </g>
    </svg>
  )
}
