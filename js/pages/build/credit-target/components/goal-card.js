import React, { Component } from 'react'

import goalIcons from '../data/goal-icons'

export default class GoalCard extends Component {
  render () {
    const { goal, includeBusiness } = this.props

    let goalBtn = (
      <a
        href='#goals'
        data-flex--item='full p-y--md'
        className='btn -secondary-7 start-goal qa-goals_start-goal-link'
        onClick={this.startGoal.bind(this)}>
        Start Goal
      </a>
    )

    if (goal.active && !goal.completed) {
      goalBtn = (
        <a
          href='#goals'
          data-flex--item='full p-y--md'
          className='btn -primary start-goal'>
          In Progress
        </a>
      )
    } else if (goal.completed) {
      goalBtn = (
        <a data-flex--item='full p-y--md' className='btn -accent-1 start-goal'>
          COMPLETE!
        </a>
      )
    }

    let addBizMessage = null

    if (goal.involvesBusiness && !includeBusiness) {
      addBizMessage = (
        <p
          data-flex--item='full'
          className='business-required'>
          In order to start this goal you must add your business to
          Nav. <a href='/app/add_business'>Add Your Business Here.</a>
        </p>
      )
    }

    return (
      <div
        data-flex--item='basis--200 grow--1 m--sm'
        data-flex--container='column'
        className={`border ${goal.completed ? 'goal__complete-box' : ''}`}>
        <div
          data-flex--container
          data-flex--item='grow--1'
          className={`goal-box-container ${goal.completed ? 'goal-complete' : ''}`}>
          <div data-flex--item='basis--75' className='goal-icon'>
            <span className={`${goalIcons[goal.type]}`} />
          </div>
          <div data-flex--item='full' className='goal-icon'>
            <h4>{goal.title}</h4>
            <p>Tasks: {goal.tasks.length}</p>
          </div>
          {addBizMessage}
        </div>
        <div data-flex--container data-flex--item>
          {goalBtn}
        </div>
      </div>
    )
  }

  startGoal () {
    const { activeBusiness, crumb, goal } = this.props

    if (goal.active) return

    window.fetch('/client/goals', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': crumb
      },
      credentials: 'include',
      body: JSON.stringify({ business_id: activeBusiness.id, type: goal.type })
    }).then((response) => {
      if (response.ok) {
        window.location.reload(true)
      }
    })

    window.analytics.track('Goal Click (Start Goal)', {
      category: 'Credit Target : Feature',
      label: `${goal.title}`,
      name: `${goal.title}`
    })
  }
}
