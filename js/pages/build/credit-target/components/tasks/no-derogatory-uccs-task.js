import React from 'react'

import TaskStatus from './task-status'

export default function NoDerogatoryUccsTask ({ task }) {
  const config = {
    measuring: 'derogatory UCC count',
    measureUnit: 'derogatory UCCs'
  }

  return <TaskStatus config={config} task={task} />
}
