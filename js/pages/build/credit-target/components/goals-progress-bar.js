import React from 'react'

export default function GoalsProgressBar ({ active, completed, goals, total }) {
  const percent = Math.floor((completed / total) * 100) || 0

  let taskCount = <span>No Goals Selected</span>

  if (active > 0) taskCount = <span>{completed}/{total} Tasks Complete</span>

  return (
    <div data-flex--item='basis--400'>
      {taskCount}
      <div className='progress'>
        <div
          className='progress-bar -blue'
          role='progressbar'
          style={{ width: `${percent}%` }}>
          <span className='sr-only'>0% Complete</span>
        </div>
      </div>
    </div>
  )
}
