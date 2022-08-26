import { EffectNodeRuntime } from '@/Runtime/EffectNodeRuntime/EffectNodeRuntime'
import { useEffect, useState } from 'react'
import { DRACOLoader } from 'three140/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three140/examples/jsm/loaders/GLTFLoader'
// import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'
import { getID } from '@/utils/get-id.js'
export async function nodeData({ defaultData, nodeID }) {
  // let defs = getDefinitions({ nodeID })

  return {
    ...defaultData,

    //
    inputs: [
      //
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
      { _id: getID(), type: 'input', nodeID },
    ],

    // at least 1
    //
    outputs: [
      //
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
      { _id: getID(), type: 'output', nodeID },
    ],

    //
    material: [],

    uniforms: [
      {
        id: getID(),
        nodeID,
        name: 'glb',
        type: 'glb',
        value: false,
        protected: true,
      },
    ],

    //
    shaders: [],

    //
  }
}

let loader = new GLTFLoader()
let draco = new DRACOLoader()
draco.setDecoderPath(`/draco/`)
draco.setCrossOrigin('')
loader.setDRACOLoader(draco)

let loadGLB = async (v) => {
  let yo = await loader.loadAsync(v)

  return yo
}

export function effect({ node, mini, data, setComponent }) {
  //
  let MakeObject = () => {
    let [glb, setGLB] = useState(null)

    useEffect(() => {
      // data.value.glb
      let send = (url) => {
        setGLB(null)

        if (url) {
          loadGLB(url).then((glb) => {
            setGLB(glb)
          })
        } else {
          setGLB(null)
        }
      }

      data.uniforms.glb((sig) => {
        send(sig.value)
      })
      send(data.value.glb)
    }, [])
    //
    //
    return (
      <>
        {glb && (
          <group key={getID()}>
            <primitive object={glb.scene} />
            <EffectNodeRuntime key={getID()} glbObject={glb} />
          </group>
        )}
      </>
    )
  }

  node.out0.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out1.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out2.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out3.pulse(<MakeObject key={getID()}></MakeObject>)
  node.out4.pulse(<MakeObject key={getID()}></MakeObject>)
}
