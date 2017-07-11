import React from 'react'

import TaskStatus from './task-status'

export default function NewBizCreditorsTask ({ task }) {
  const config = {
    measuring: 'number of creditor accounts',
    measureUnit: 'accounts'
  }

  return <TaskStatus config={config} task={task} />
}
