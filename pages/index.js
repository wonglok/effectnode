import { Canvas } from '@react-three/fiber'
import { EffectNode } from '../src/Runtime/EffectNode'

export default function Render() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <EffectNode></EffectNode>
      </Canvas>
    </div>
  )
}
