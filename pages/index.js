import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectNodeRuntime, StandardLibrary } from '@/index'
import { Environment, useGLTF } from '@react-three/drei'

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

//

function Content() {
  let codes = [...StandardLibrary.v0]
  let glb = useGLTF(`/glb/landing-effect.glb`)
  return (
    <group>
      <Environment preset='city'></Environment>
      <primitive object={glb.scene}></primitive>
      <EffectNodeRuntime glb={glb} codes={codes}></EffectNodeRuntime>
    </group>
  )
}

//
