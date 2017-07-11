import React from 'react'

import TaskStatus from './task-status'

export default function AllDnbAccountsCurrentTask ({ task }) {
  const config = {
    measuring: 'Dun & Bradstreet accounts past due'
  }

  return <TaskStatus config={config} task={task} />
}
