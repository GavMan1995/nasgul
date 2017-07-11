import React from 'react'

import TaskStatus from './task-status'

export default function DebtUsageBelowTask ({ task }) {
  const config = {
    measuring: 'debt usage percentage',
    measureUnit: 'percentage'
  }

  return <TaskStatus config={config} task={task} />
}
