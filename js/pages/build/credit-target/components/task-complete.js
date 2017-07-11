import React from 'react'

export default function TaskComplete ({ task }) {
  if (!task.completed) return null

  return (
    <li className='goal-task goal-task-complete'>
      <i className='fa fa-check-circle color-good goal-task-check' />
      <span><strong> Task: </strong>{task.title}</span>
      <span className='color-good task-complete-text'>
        <strong> Task Complete!</strong>
      </span>
    </li>
  )
}
