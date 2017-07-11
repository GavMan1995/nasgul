import React from 'react'

import TaskStatus from './task-status'

export default function NoInquiriesTask ({ task }) {
  const config = {
    measuring: 'inquiries',
    measureUnit: 'inquiries'
  }

  return <TaskStatus config={config} task={task} />
}
