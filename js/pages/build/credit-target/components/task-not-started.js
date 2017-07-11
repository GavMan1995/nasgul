import React from 'react'

import taskStatusComponent from './tasks'

export default function TaskNotStarted (props) {
  const { requiresUpgrade, refreshable, refreshDate, task } = props

  let component = null
  let refreshReports = (
    <span className='pull-right check-progress-date xs-block'>
      Check your progress on {refreshDate}
    </span>
  )
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
      {component}
    </li>
  )
}
