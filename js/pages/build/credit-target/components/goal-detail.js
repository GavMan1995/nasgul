import React from 'react'

import goalIcons from '../data/goal-icons'

import BizCreditCardOffer from './biz-credit-card-offer'
import BizScoreOffer from './biz-score-offer'
import GoalCompleted from './goal-completed'
import TaskItem from './task-item'
import TaskProgressBar from './task-progress-bar'

export default function GoalDetail (props) {
  const { completed, crumb, goal, total } = props

  let bizCreditCardOffer = null
  let bizScoreOffer = null
  let successMessage = null

  if (goal.type === 'BusinessCreditCardGoal') {
    bizCreditCardOffer = <BizCreditCardOffer />
  }

  if (goal.type === 'IncreaseBusinessScoreGoal') {
    bizScoreOffer = <BizScoreOffer />
  }

  if (goal.completed && goal.successMessage !== '') {
    successMessage = (
      <p
        className='alert alert-success'>
        Congratulations! You now may qualify for a business credit card.
        Visit the <a href='/app/market'>Financing</a> page to see customized
        credit offers based on your score.
      </p>
    )
  }

  return (
    <div>
      <div
        data-flex--item='basis--50 pull--right'
        className='build__btn-close'
        onClick={() => quitGoal(goal.title, goal.id, crumb)}>
        &times;
      </div>
      <div
        data-flex--container
        data-flex--item='p--md'
        className='border--4 goal-detail-container'>

        <div data-flex--item='basis--800 grow--1'>
          <TaskProgressBar completed={completed} goal={goal} total={total} />
          <GoalCompleted goal={goal} />

          <h4>
            <span className={`${goalIcons[goal.type]}`} />
            {goal.title}
          </h4>

          <p>{goal.description}</p>
          {successMessage}

          <ul className='list-unstyled' data-flex--item='p-t--lg'>
            {goal.tasks.map((task, index) => {
              return <TaskItem key={index} task={task} />
            })}
          </ul>

          {bizCreditCardOffer}
          {bizScoreOffer}
        </div>
      </div>
    </div>
  )
}

function quitGoal (goal, goalId, crumb) {
  const isSure = window.confirm(
    'If you quit this goal you will lose all your progress. Continue?'
  )

  if (!isSure) return

  window.fetch(`/client/goals/${goalId}/quit`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': crumb
    },
    credentials: 'include'
  }).then((response) => {
    if (response.ok) {
      window.location.reload(true)
    }
  })

  window.analytics.track('Button Click (Close Goal)', {
    category: 'Credit Target : Feature',
    label: `${goal}`,
    name: `${goal}`
  })
}
