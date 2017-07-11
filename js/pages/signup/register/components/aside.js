import React from 'react'

export default function Aside (props) {
  return (
    <div className='o-section o-section--aside'>
      <div className='c-signup-info'>
        <h2>Every Nav Account includes:</h2>

        <p className='u-large-copy'>
          <strong>Proprietary MatchFactor technology</strong>
        </p>
        <ul className='c-flush-bullet-list'>
          <li>Analyzes your credit profile.</li>
          <li>Compares it with hundreds of top business lenders and credit cards.</li>
          <li>Creates scores that show chances of being approved.</li>
          <li>All without affecting your credit.</li>
        </ul>

        <p className='u-large-copy'><strong>Self-serve tools to help build business credit</strong></p>
        <ul className='c-flush-bullet-list'>
          <li>
            <strong>Disputes</strong> allows you to contest credit errors
            with a single click.
          </li>
          <li>
            <strong>BusinessLauncher</strong> helps you take your idea for a
            business from concept to launch, and setup for growth.
          </li>
          <li>
            <strong>Goals</strong> provides simple tasks for you to complete to
            help improve your business credit scores.
          </li>
        </ul>

        <p className='u-large-copy'><strong>Trusted security features</strong></p>
        <ul className='c-flush-bullet-list'>
          <li>
            Credit bureau-level security keeps your personal data safe, while
            24/7 monitoring and alerts protect your credit.
          </li>
        </ul>
      </div>
    </div>
  )
}
