import React from 'react'
import { Link } from 'react-router-dom'
export function Landing() {
  return (
    <div>
      <Link to='/StaticDemo'>StaticDemo</Link>
      <Link to='/FirebaseDemo'>FirebaseDemo</Link>
    </div>
  )
}
