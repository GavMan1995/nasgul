import React, { Component } from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import TaskComplete from './task-complete'
import TaskFailed from './task-failed'
import TaskInProgress from './task-in-progress'
import TaskNotStarted from './task-not-started'

class TaskItem extends Component {
  render () {
    const { me, plan, task } = this.props
    const freebie = (me.billingState === 'free' || plan.name === 'Standard')
    const requiresUpgrade = freebie && task.requires_paid_account
    const nextReportDate = moment(task.next_report_date)
    const refreshable = moment().format('YYYY-MM-DD') === moment(nextReportDate).format('YYYY-MM-DD')

    let refreshDate = 'never'
    let renderTask = null

    if (nextReportDate.isValid()) refreshDate = nextReportDate.format('MMM DD')

    if (!task.completed && !task.failed_at && task.duration_in_months) {
      renderTask = (
        <TaskInProgress
          requiresUpgrade={requiresUpgrade}
          task={task} />
      )
    } else if (!task.completed && !task.failed_at && !task.duration_in_months) {
      renderTask = (
        <TaskNotStarted
          requiresUpgrade={requiresUpgrade}
          refreshable={refreshable}
          refreshDate={refreshDate}
          task={task} />
      )
    } else if (task.failed_at) {
      renderTask = <TaskFailed task={task} />
    } else if (task.completed) {
      renderTask = <TaskComplete task={task} />
    }

    return renderTask
  }
}

function mapStateToProps (state) {
  const { me, plan } = state

  return { me, plan }
}

export default connect(mapStateToProps)(TaskItem)
