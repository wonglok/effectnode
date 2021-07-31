import React from 'react'
import { Link } from 'react-router-dom'
export function Landing() {
  return (
    <div>
      Demos of EffectNode Runtime:
      <ul>
        <li>
          <Link to='/effectnode/StaticDemo'>StaticDemo</Link>
        </li>
        <li>
          <Link to='/effectnode/FirebaseDemo'>FirebaseDemo</Link>
        </li>
      </ul>
    </div>
  )
}
