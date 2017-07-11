import React from 'react'

import taskStatusComponent from './tasks'

export default function TaskInProgress (props) {
  const {
    refreshable,
    refreshDate,
    requiresUpgrade,
    task
  } = props

  let component = null
  let refreshReports = (
    <span className='pull-right check-progress-date xs-block'>
      Check your progress on {refreshDate}
    </span>
  )
  let restartTask = null
  let upgradeMessage = (
    <span>
      <strong> Task: </strong> {task.title}
    </span>
  )

  if (!task.duration_in_months && task.current_value && !requiresUpgrade) {
    const ActualComponent = taskStatusComponent[task.type]

    if (ActualComponent) {
      component = <ActualComponent task={task} />
    }
  }

  if (refreshable || !refreshDate || /never/i.test(refreshDate)) {
    refreshReports = null
  }

  if (task.failed_at) {
    restartTask = (
      <a className='goal-task-restart pull-right' href=''>
        Restart this task
      </a>
    )
  }

  if (requiresUpgrade) {
    upgradeMessage = (
      <span>
        <img
          src='https://dxkdvuv3hanyu.cloudfront.net/images/icon-upgrade.svg'
          className='goal-locked' />
        <strong> Task: </strong> {task.title} <span>(<a href='/app/upgrade/premium' className='goal-task-required'><em>Requires Upgrade</em></a>)
        </span>
      </span>
    )
  }

  return (
    <li className='goal-task'>
      {refreshReports}
      {upgradeMessage}
      {restartTask}
      {component}
    </li>
  )
}
