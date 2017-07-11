import React from 'react'
import flatten from 'lodash.flatten'

import GoalCard from './goal-card'
import GoalsProgressBar from './goals-progress-bar'
import SelectedGoalsSection from './selected-goals-section'

export default function GoalsSection (props) {
  const { activeBusiness, crumb, goals, includeBusiness } = props
  const currentGoals = goals.filter((goal) => goal.active)
  const activeGoalCount = currentGoals.length
  const allTasks = flatten(currentGoals.map((goal) => goal.tasks))
  const totalTaskCount = allTasks.length
  const completedTaskCount = allTasks.filter((task) => task.completed).length

  return (
    <div
      data-flex--item='basis--800 grow--4'
      data-flex--container
      className='main-section'>
      <div
        data-flex--item='full'
        data-flex--container='nowrap'
        className='section-content__header'>
        <GoalsProgressBar
          active={activeGoalCount}
          completed={completedTaskCount}
          goals={goals}
          total={totalTaskCount} />

        <div
          data-flex--item='basis--50 pull--right'
          className='build__btn-close'
          onClick={() => { window.location.href = '/app/build' }}>
          &times;
        </div>
      </div>

      <div
        data-flex--item='full'
        className='section-content-mainbox business-mainbox'>
        <div
          data-flex--item='full m-b--xxl m-x--sm-neg'
          data-flex--container>
          <h3 className='other-goals' data-flex--item='full p-x--sm'>
            Select a Goal to Get Started
          </h3>
          <p data-flex--item='p-b--xl p-x--sm'>
            CreditTarget Goals gives you actionable tasks to achieve specific
            goals. From getting a business loan with low rates to improving
            your business credit score, we'll help get you there fast.
            Not all these goals happen overnight though. Come back every
            month to see how you're progressing—some changes take 3+ months.
          </p>
          {goals.map((goal, index) => {
            return (
              <GoalCard
                key={index}
                activeBusiness={activeBusiness}
                crumb={crumb}
                goal={goal}
                includeBusiness={includeBusiness} />
            )
          })}
        </div>

        <SelectedGoalsSection
          active={activeGoalCount}
          completed={completedTaskCount}
          crumb={crumb}
          goals={goals}
          total={totalTaskCount} />
      </div>
    </div>
  )
}
