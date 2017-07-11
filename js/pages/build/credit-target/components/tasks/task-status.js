import React from 'react'

import moment from 'moment'

export default function TaskStatus ({ config = {}, task }) {
  const unitsToGo = parseInt(task.lower_bound) - parseInt(task.current_value)

  let unitsLeft = null

  if (unitsToGo && unitsToGo > 0) {
    unitsLeft = <span> | {config.measureUnit || 'Points'} needed: {unitsToGo}</span>
  }

  if (task.duration_in_months && monthsSinceStart(task) > 0) {
    return (
      <p className='color-good goal-task-p'>
        <span className='fa fa-smile-o' /> <strong>Good job! </strong>
        {`You've gone ${monthsSinceStart(task)} month${monthsSinceStart(task) > 1 ? 's' : ''} with no ${config.measureUnit}!`}
      </p>
    )
  }

  return (
    <p className='goal-task-p goal-task-details'>
      Current {config.measuring || 'Score'}: {task.current_value}
      {unitsLeft}
    </p>
  )
}

function monthsSinceStart (task) {
  return moment().diff(task.started_at, 'months')
}
