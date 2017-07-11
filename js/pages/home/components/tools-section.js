import React, { Component } from 'react'

import TaskProgress from './task-progress'

export default class ToolsSection extends Component {
  render () {
    const { tools, me } = this.props

    return (
      <section className='c-card c-card--full'>
        <div className='c-card__header'>
          <h2>Tools</h2>
        </div>
        <div className='c-card__content'>
          <a
            href='/app/build/business_launcher'
            className='c-build-tool-tile qa-dashboard__tools__business-launcher'
            onClick={() => trackClick(me.email, 'BusinessLauncher', 'Body')}>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/business-launcher_72x72.svg'
              className='c-build-tool-tile__img'
              onClick={() => trackClick(me.email, 'BusinessLauncher', 'Icon')} />

            <div className='c-build-tool-tile__copy'>
              <h4 onClick={() => trackClick(me.email, 'BusinessLauncher', 'Header')}>
                BusinessLauncher
              </h4>
              <TaskProgress
                completed={tools.business_launcher_completed}
                total={tools.business_launcher_total} />
            </div>

            <div className='c-progress-bar c-progress-bar--short'>
              <span
                style={{ width: `${(tools.business_launcher_completed / tools.business_launcher_total) * 100}%` }}
                role='progressbar'
                aria-valuemax='100'
                aria-valuemin='0'
                aria-valuenow='60' />
            </div>
          </a>

          <a
            href='/app/build/credit_sweeper'
            className='c-build-tool-tile qa-dashboard__tools__disputes'
            onClick={() => trackClick(me.email, 'CreditSweeper', 'Body')}>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/credit-sweeper_72x72.svg'
              className='c-build-tool-tile__img'
              onClick={() => trackClick(me.email, 'CreditSweeper', 'Icon')} />

            <div className='c-build-tool-tile__copy'>
              <h4 onClick={() => trackClick(me.email, 'CreditSweeper', 'Header')}>
                Disputes
              </h4>
              <TaskProgress
                completed={tools.credit_sweeper_completed}
                total={tools.credit_sweeper_total} />
            </div>

            <div className='c-progress-bar c-progress-bar--short'>
              <span
                style={{ width: `${(tools.credit_sweeper_completed / tools.credit_sweeper_total) * 100}%` }}
                role='progressbar'
                aria-valuemax='100'
                aria-valuemin='0'
                aria-valuenow='60' />
            </div>
          </a>

          <a
            href='/build/credit-target'
            className='c-build-tool-tile qa-dashboard__tools__goals'
            onClick={() => trackClick(me.email, 'CreditTarget', 'Body')}>
            <img
              src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/credit-target_72x72.svg'
              className='c-build-tool-tile__img'
              onClick={() => trackClick(me.email, 'CreditTarget', 'Icon')} />

            <div className='c-build-tool-tile__copy'>
              <h4 onClick={() => trackClick(me.email, 'CreditTarget', 'Header')}>
                Goals
              </h4>
              <TaskProgress
                completed={tools.credit_target_completed}
                total={tools.credit_target_total} />
            </div>

            <div className='c-progress-bar c-progress-bar--short'>
              <span
                style={{ width: `${(tools.credit_target_completed / tools.credit_target_total) * 100}%` }}
                role='progressbar'
                aria-valuemax='100'
                aria-valuemin='0'
                aria-valuenow='60' />
            </div>
          </a>
        </div>
      </section>
    )
  }

  componentDidMount () {
    // Use Redux middleware to retrieve data for this section!
    this.props.fetchData()
  }
}

function trackClick (userId, name, element) {
  window.analytics.track(
    'Card Interaction',
    {
      userId: userId,
      category: 'Dashboard:ScoreTools',
      action: 'Click:' + element,
      label: name
    }
  )
}
