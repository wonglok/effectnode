import { Canvas, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Preload, useGLTF } from '@react-three/drei'
import { sRGBEncoding } from 'three140'
import * as EN from '../src'

export default function Render() {
  return (
    <div className='w-full h-full'>
      <Canvas
        onCreated={(st) => {
          st.gl.physicallyCorrectLights = true
          st.gl.outputEncoding = sRGBEncoding
        }}
      >
        <Suspense fallback={null}>
          <Preload all></Preload>
          <Content></Content>
          <Environment background preset='city'></Environment>
          <CameraConfig></CameraConfig>
        </Suspense>
      </Canvas>
    </div>
  )
}

//

function Content() {
  let glb = useGLTF(`/glb/landing-effect.glb`)
  let codes = EN.EffectNodes.AllNodes
  return (
    <group>
      <primitive object={glb.scene}></primitive>
      <EN.EffectNodeRuntime glb={glb} codes={codes}></EN.EffectNodeRuntime>
    </group>
  )
}

function CameraConfig() {
  let camera = useThree((s) => s.camera)
  camera.position.z = 10
  camera.position.y = 5
  return null
}
