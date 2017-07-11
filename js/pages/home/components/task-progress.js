import React from 'react'

export default function TaskProgress ({ completed, total }) {
  if (typeof completed === 'undefined') return <p>Loading&hellip;</p>

  if (!total) return <p>Get Started</p>

  return <p>{completed}/{total} Tasks Completed</p>
}
