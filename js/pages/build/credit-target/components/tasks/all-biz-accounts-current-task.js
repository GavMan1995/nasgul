import React from 'react'

import TaskStatus from './task-status'

export default function AllBizAccountsCurrentTask ({ task }) {
  const config = {
    measuring: 'Experian business accounts past due'
  }

  return <TaskStatus config={config} task={task} />
}
