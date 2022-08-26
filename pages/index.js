import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectNode } from '@/index'

export default function Render() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <Suspense fallback={null}>
          <Content></Content>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Content() {
  return (
    <group>
      <EffectNode></EffectNode>
    </group>
  )
}

//
//
