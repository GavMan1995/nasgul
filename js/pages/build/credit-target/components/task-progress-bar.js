import React from 'react'

export default function TaskProgressBar ({ goal }) {
  const completedTaskCount = goal.tasks.filter((task) => task.completed).length
  const totalTaskCount = goal.tasks.length
  const percent = Math.floor((completedTaskCount / totalTaskCount) * 100)

  if (goal.completed) return null

  return (
    <div className='pull-right xs-block'>
      <p className='task-count'>
        {completedTaskCount} / {totalTaskCount} Tasks Complete
      </p>
      <div className='progress'>
        <div
          className='progress-bar progress-bar-good'
          style={{ width: `${percent}%` }}
          role='progressbar'>
          <span className='sr-only'>
            (({completedTaskCount / totalTaskCount}) * 100)% Complete
          </span>
        </div>
      </div>
    </div>
  )
}
