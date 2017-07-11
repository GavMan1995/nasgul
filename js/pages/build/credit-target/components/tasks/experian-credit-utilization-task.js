import React from 'react'

import TaskStatus from './task-status'

export default function ExperianCreditUtilizationTask ({ task }) {
  const config = {
    measuring: 'credit utilization percentage',
    measureUnit: 'percentage'
  }

  return <TaskStatus config={config} task={task} />
}
