import React from 'react'

export default function GoalCompleted ({ goal }) {
  if (!goal.completed) return null

  return (
    <div className='goal-complete-message pull-right text-center'>
      <h3 className='color-good'>
        <span className='fa fa-trophy' /> Success!
      </h3>
      <p>You have completed this goal!</p>
      <a className='btn btn-blue btn-xs btn-update-report'> {/* TODO: ng-click='closeGoal()' */}
        Close Goal
      </a>
    </div>
  )
}
