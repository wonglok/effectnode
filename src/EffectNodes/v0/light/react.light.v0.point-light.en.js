import { getID } from '../../../utils/get-id'
import { createPortal } from '@react-three/fiber'
import md5 from 'md5'
import { useEffect, useRef } from 'react'
import { BackSide, FrontSide, sRGBEncoding } from 'three'
import {
  Color,
  DoubleSide,
  MeshPhysicalMaterial,
  Texture,
  TextureLoader,
} from 'three140'
import { DRACOLoader } from 'three140/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three140/examples/jsm/loaders/GLTFLoader'
// import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

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

    //
    // uniforms: [
    //   ...defs.uniforms,

    //   // {
    //   //   id: getID(),
    //   //   nodeID,
    //   //   name: 'shader',
    //   //   type: `glsl`,
    //   //   value: `
    //   //   `,
    //   // },
    // ],

    uniforms: [
      //
      {
        id: getID(),
        nodeID,
        name: 'intensity',
        type: 'float',
        value: 50,
        protected: true,
      },
      //
      {
        id: getID(),
        nodeID,
        name: 'color',
        type: 'color',
        value: '#ffffff',
        protected: true,
      },
    ],

    //
    shaders: [],

    //
  }
}

// let loader = new GLTFLoader()
// let draco = new DRACOLoader()
// draco.setDecoderPath(`/draco/`)
// draco.setCrossOrigin('')
// loader.setDRACOLoader(draco)

// // let computeCache = new Map()
// let loadGLB = async (v) => {
//   let yo = await loader.loadAsync(v)

//   return yo
// }

// let getSide = (side) => {
//   if (side === 'front') {
//     return FrontSide
//   } else if (side === 'back') {
//     return BackSide
//   } else if (side === 'double') {
//     return DoubleSide
//   }
// }

// let original = new Map()

function ObjectItem({ data }) {
  let ref = useRef()

  useEffect(() => {
    ref.current.intensity = data.value.intensity
    ref.current.color = data.value.color

    data.uniforms.intensity((sig) => {
      if (ref.current) {
        ref.current.intensity = sig.value
      }
    })
    data.uniforms.color((sig) => {
      if (ref.current) {
        ref.current.color = new Color(sig.value)
      }
    })
  }, [data])

  return (
    <pointLight
      ref={ref}
      intensity={data.value.intensity}
      color={data.value.color}
    ></pointLight>
  )
}

function Compo({ node, mini, data, setComponent }) {
  useEffect(() => {
    let item = <ObjectItem mini={mini} data={data}></ObjectItem>

    node.out0.pulse(item)
    data.uniforms.intensity(() => {
      node.out0.pulse(item)
    })
    data.uniforms.color(() => {
      node.out0.pulse(item)
    })
  })
  return null
}

export function effect({ node, mini, data, setComponent }) {
  // let send = () => {
  //   let makeObj = () => (
  //     <pointLight
  //       key={getID()}
  //       intensity={data.value.intensity}
  //       color={data.value.color}
  //     ></pointLight>
  //   )

  //   node.out0.pulse(makeObj())
  // }

  // data.uniforms.intensity(() => {
  //   send()
  // })
  // data.uniforms.color(() => {
  //   send()
  // })
  // send()

  // mini.onClean(() => {
  //   node.out0.pulse(null)
  // })

  setComponent(<Compo node={node} mini={mini} data={data}></Compo>)

  //
  //
  // //
  // // setComponent
  // //
  // let defs = getDefinitions({ nodeID: data.raw.nodeID })
  // // let inputReceivers = {}
  // // let makeElemnet = () => {
  // //   let kidz = []
  // //   for (let socketInputName in inputReceivers) {
  // //     if (inputReceivers[socketInputName]) {
  // //       kidz.push(inputReceivers[socketInputName])
  // //     }
  // //   }
  // //   return (
  // //   )
  // // }
  // let send = () => {
  //   if (!original.has(data.raw.nodeID)) {
  //     original.set(data.raw.nodeID, mini.now.itself.material.clone())
  //   }
  //   let clonedOrig = original.get(data.raw.nodeID).clone()
  //   mini.now.itself.material = clonedOrig
  //   delete clonedOrig.defines
  //   let newMat = new MeshPhysicalMaterial({ ...clonedOrig })
  //   defs.uniforms.forEach((uni) => {
  //     let val = data.value[uni.name]
  //     if (val) {
  //       if (uni.name === 'side') {
  //         newMat[uni.name] = getSide(val)
  //       } else if (uni.type === 'float') {
  //         newMat[uni.name] = val
  //       } else if (uni.type === 'color') {
  //         newMat[uni.name] = new Color(val)
  //       } else if (uni.type === 'texture') {
  //         newMat[uni.name] = loadTexture(val)
  //       }
  //     }
  //     //
  //   })
  //   mini.now.itself.material = newMat
  // }
  // // let inputSockets = ['in0', 'in1', 'in2', 'in3', 'in4']
  // // inputSockets.forEach((socket) => {
  // //   inputReceivers[socket] = null
  // //   node[socket].stream((v) => {
  // //     inputReceivers[socket] = v
  // //     send()
  // //   })
  // // })
  // let last = {}
  // defs.uniforms.forEach((uni) => {
  //   //
  //   data.uniforms[uni.name]((signal) => {
  //     if (last[uni.name] !== signal.value) {
  //       last[uni.name] = signal.value
  //       send()
  //     }
  //   })
  //   //
  // })
  // send()
  //
  //
  //
}