import React from 'react'

export default function TaskFailed ({ task }) {
  return (
    <li className='goal-task goal-task-fail'>
      <i className='fa fa-times-circle color-bad goal-task-x' />
      <span><strong> Task: </strong>{task.title}</span>
      <a className='goal-task-restart pull-right'>
        Restart this task
      </a>
      <p className='color-bad goal-task-p'>
        <strong>
          You've failed this task!
        </strong> <a href={task.analyze_link}>See Details</a>
      </p>
    </li>
  )
}
