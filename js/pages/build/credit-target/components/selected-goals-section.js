import React from 'react'

import GoalDetail from './goal-detail'

export default function selectedGoalsSection (props) {
  const { active, completed, crumb, goals, total } = props

  if (active === 0) return null

  return (
    <div id='goals' data-flex--container className='col-xs-12 goals-selected'>
      <h3
        data-flex--item='full'
        id='selectedGoals'
        className='other-goals'>
        Your Selected Goals:
      </h3>

      {goals.map((goal, index) => {
        if (goal.active) {
          return (
            <GoalDetail
              key={index}
              data-flex--item='full'
              completed={completed}
              crumb={crumb}
              goal={goal}
              total={total} />
          )
        }
      })}
    </div>
  )
}
