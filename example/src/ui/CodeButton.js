import React from 'react'

export function CodeButton({ url }) {
  return (
    <a href={url} target='_blank' rel='noreferrer noopener'>
      <button
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
          padding: '10px 20px',
          appearance: 'none',
          backgroundColor: 'greenyellow',
          border: 'none',
          borderRadius: `15px`,
          color: 'darkgreen',
          cursor: 'pointer'
        }}
      >
        View Code
      </button>
    </a>
  )
}
