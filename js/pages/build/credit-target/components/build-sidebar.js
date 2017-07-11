import React from 'react'

export default function BuildSidebar ({ build, location }) {
  let creditTargetProgress = <p>{build.creditTargetCompleted}/{build.creditTargetTotal} Complete</p>

  if (build.creditTargetCompleted === build.creditTargetTotal) {
    creditTargetProgress = <p>No Goals Selected</p>
  }

  return (
    <div
      data-flex--container
      data-flex--item='full'
      className='main-section side-section'>
      <div
        data-flex--item='basis--200 grow--1 p-x--md p-t--none'
        className=' build-sidebar__pad'
        onClick={() => { window.location.href = '/app/build/business_launcher' }}>
        <div>
          <div
            data-flex--container
            className={`build-sidebar text-center ${location.pathname === 'app/build/business_launcher' ? 'sidebar-active' : ''}`}>
            <h5 className='bizlaunch'>BusinessLauncher</h5>
            <div className='build-sidebar__img'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/business-launcher_72x72.svg' />
            </div>
            <p>{build.businessLauncherCompleted}/{build.businessLauncherTotal} Complete</p>
          </div>
        </div>
      </div>

      <div
        data-flex--item='basis--200 grow--1 p-x--md'
        className=' build-sidebar__pad'
        onClick={() => { window.location.href = '/app/build/credit_sweeper' }}>
        <div className='build__sidebar-box'>
          <div
            data-flex--container
            className={`build-sidebar text-center ${location.pathname === 'app/build/credit_sweeper' ? 'sidebar-active' : ''}`}>
            <h5>Disputes</h5>
            <div className='build-sidebar__img'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/credit-sweeper_72x72.svg' />
            </div>
            <p>{build.creditSweeperCompleted}/{build.creditSweeperTotal} Complete</p>
          </div>
        </div>
      </div>

      <div
        data-flex--item='basis--200 grow--1 p-x--md'
        className=' build-sidebar__pad'
        onClick={() => { window.location.href = '/build/credit-target' }}>
        <div className='build__sidebar-box'>
          <div
            data-flex--container
            className={`build-sidebar text-center ${location.pathname === '/build/credit-target' ? 'sidebar-active' : ''}`}>
            <h5>Goals</h5>
            <div className='build-sidebar__img'>
              <img src='https://dxkdvuv3hanyu.cloudfront.net/design-assets/icons/credit-target_72x72.svg' />
            </div>
            {creditTargetProgress}
          </div>
        </div>
      </div>
    </div>
  )
}
