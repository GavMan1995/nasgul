import React from 'react'

import TaskStatus from './task-status'

export default function NoLatePaymentsTask ({ task }) {
  const config = {
    measuring: 'late payments',
    measureUnit: 'late payments'
  }

  return <TaskStatus config={config} task={task} />
}
