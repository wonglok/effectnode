# effectnode

> generic effectnode runtime, demo in react

[![NPM](https://img.shields.io/npm/v/effectnode.svg)](https://www.npmjs.com/package/effectnode) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save effectnode
```

## Usage

```jsx
import React, { useEffect, useRef, useState } from 'react'
import { ENRuntime, getEffectNodeData } from 'effectnode'
import { Canvas, useFrame } from '@react-three/fiber'
export function FirebaseDemo() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <EffectNodeInFiber></EffectNodeInFiber>
      </Canvas>
    </div>
  )
}

export function EffectNodeInFiber() {
  let mounter = useRef()
  let graph = useRef()
  let [myInst, setCompos] = useState(() => {
    return <group></group>
  })

  useEffect(() => {
    getEffectNodeData({ firebaseConfig, graphID: `-MdBQtfGPXXPkl-NuEoW` }).then(
      (json) => {
        graph.current = new ENRuntime({
          json: json,
          codes: getCodes()
        })

        graph.current.mini.get('DefaultComponent').then((v) => {
          setCompos(v)
        })
      }
    )

    return () => {
      if (graph.current) {
        graph.current.mini.clean()
        graph.current.clean()
      }
    }
  }, [])

  useFrame(({ get }) => {
    let three = get()
    if (graph.current) {
      for (let kn in three) {
        graph.current.mini.set(kn, three[kn])
      }
      if (mounter.current) {
        graph.current.mini.set('mounter', mounter.current)
      }
      graph.current.mini.work()
    }
  })

  return (
    <>
      <group ref={mounter}>{myInst}</group>
    </>
  )
}

export const getCodes = () => {
  let path = require('path')
  let r = require.context('./vfx-codes', true, /\.js$/, 'lazy')

  function importAll(r) {
    let arr = []
    r.keys().forEach((key) => {
      let filename = path.basename(key)

      arr.push({
        title: filename,
        loader: () => r(key)
      })
    })

    return arr
  }
  let codes = importAll(r)

  return codes
}

export const firebaseConfig = {
  databaseURL: 'https://en-you.firebaseio.com/'
}
```

## License

MIT © [wonglok](https://github.com/wonglok)
