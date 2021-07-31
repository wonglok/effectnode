import React, { useEffect, useRef, useState } from 'react'
import { ENRuntime, getEffectNodeData } from 'effectnode'
import { Canvas, useFrame } from '@react-three/fiber'

export function ENRuntimeDemo() {
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
        graph.current = new ENRuntime({ json, codes: getCodes() })
        graph.current.mini.get('DefaultComponent').then((v) => {
          setCompos(v)
        })
      }
    )

    return () => {
      graph.current.mini.clean()
      graph.current.clean()
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
  apiKey: 'AIzaSyAPuwK2yMl025KLVTnGDdN34XxHBYQHoVk',
  authDomain: 'effect-node-by-you.firebaseapp.com',
  databaseURL: 'https://en-you.firebaseio.com/',
  projectId: 'effect-node-by-you',
  storageBucket: 'effect-node-by-you.appspot.com',
  messagingSenderId: '587774316246',
  appId: '1:587774316246:web:2a52c46bd184fc3a1d4377',
  measurementId: 'G-SYFGKL6VNR'
}

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}
