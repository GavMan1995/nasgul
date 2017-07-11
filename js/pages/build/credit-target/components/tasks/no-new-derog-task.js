import React from 'react'

import TaskStatus from './task-status'

export default function NoNewDerogTask ({ task }) {
  const config = {
    measuring: 'derogatories',
    measureUnit: 'derogatories'
  }

  return <TaskStatus config={config} task={task} />
}
