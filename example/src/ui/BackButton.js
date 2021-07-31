import React from 'react'
import { Link } from 'react-router-dom'
export function BackButton({ url }) {
  return (
    <Link to={'/'}>
      <button
        style={{
          position: 'absolute',
          top: '50px',
          left: '50px',
          padding: '10px 20px',
          appearance: 'none',
          backgroundColor: 'cyan',
          border: 'none',
          borderRadius: `15px`,
          color: 'darkblue',
          cursor: 'pointer'
        }}
      >
        Home
      </button>
    </Link>
  )
}
