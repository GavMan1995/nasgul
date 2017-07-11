import React from 'react'

import ScoreDonut from '../components/score-donut'

export default function UpgradeTile ({maxScore, bureau, upgradePath}) {
  let copy = (
    <p>
      You can get this report on any paid account. Full reports provide
      details lenders use, so you can be loan-ready.
    </p>
  )

  if (bureau === 'fico') {
    copy = (
      <p>
        The FICO SBSS score is FICO’s <strong>business credit score</strong>.
        The SBA uses it to see if you qualify for their low-interest loans.
      </p>
    )
  }

  return (
    <div className='c-dashboard__score-container'>
      <a
        href={`/app/upgrade/${upgradePath}`}
        className='c-clarity-tile'
        onClick={() => {
          window.analytics.track('Feature Click', {
            category: 'Internal Link',
            name: `Clarity: ${bureau} Upgrade Tile`,
            label: `Clarity: ${bureau} Upgrade Tile`
          })
        }}>
        {copy}
        <span className='c-btn c-btn--primary'>
          Learn More
        </span>
      </a>
      <div
        data-flex--container='true column'
        data-flex--item='grow--1'
        className='score-tile'>
        <div
          className='score-logo'
          data-flex--container='true'
          data-flex--item='grow--1'>
          <img src={`https://dxkdvuv3hanyu.cloudfront.net/images/${bureau}-logo.png`} />
        </div>

        <div
          data-flex--container='true'
          data-flex--item='grow--1'
          className='score-container'>
          <div className='donut-container'>
            <div className='donutScoreName'>
              <div className='donutScore js-private'>
                ?
              </div>
              <div className='donut-score-quality'>
                N/A
              </div>
            </div>

            <div className='donutChart'>
              <ScoreDonut
                width={100}
                strokeWidth={8}
                value={0}
                max={maxScore}
                level={'no_data'} />
            </div>
          </div>
        </div>

        <div
          data-flex--container='true space-around-items'
          data-flex--item='grow--1'
          className='score-addons'>
          <div>
            <p className='score-subhead'>MAX</p>
            <h5 className='score-addon-item'>{maxScore}</h5>
          </div>
          <div>
            <p className='score-subhead'>CHANGE</p>
            <h5 className='score-addon-item'>
              N/A
            </h5>
          </div>
        </div>

        <div data-flex--container='true center' className='tile-footer'>
          <p className='text-uppercase text-center'>See the Report</p>
        </div>
      </div>
    </div>
  )
}
