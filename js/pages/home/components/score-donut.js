import React from 'react'

import PercentDonut from './percent-donut'

const colorLookup = {
  excellent: '#00bb7b',
  good: '#00bb7b',
  average: '#ffc709',
  fair: '#ffc709',
  poor: '#ed193f',
  bad: '#ed193f',
  no_data: '#e2e2e2'
}

export default function ScoreDonut (props) {
  return <PercentDonut {...props} fgColor={colorLookup[props.level]} />
}
