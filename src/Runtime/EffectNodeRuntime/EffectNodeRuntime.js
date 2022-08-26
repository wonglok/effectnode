import { Suspense, useEffect, useState } from 'react'
import { ENRunNode } from './ENRunNode'
import { signGLB } from '@/utils/sign-glb'
import { StandardLibrary } from '../../../output'

//
export function EffectNodeRuntime({
  glb,
  originalGLB,
  codes = StandardLibrary.version0,
  disabledNodes = ['effect-composer', '.pass.', 'global.'],
}) {
  // let ens = useFilterEffectNode({ glbObject })
  glb.scene.updateMatrixWorld(true)

  // let [ready, setReady] = useState(false)
  useEffect(() => {
    // setReady(false)

    signGLB(glb)
    if (originalGLB) {
      signGLB(originalGLB)
    }

    // setTimeout(() => {
    //   //
    //   // glbObject.scene =

    //   // clone(originalGLBObject.scene)

    //   // let ens = []

    //   // if (glbObject) {
    //   //   glbObject.scene.traverse((it) => {
    //   //     if (it.userData.effectNode) {
    //   //       ens.push(it)
    //   //     }
    //   //   })
    //   // }

    //   // ens.forEach((en) => {
    //   //   en.updateMatrixWorld()
    //   //   //
    //   //   if (en.userData.effectNode) {
    //   //     if (originalGLBObject) {
    //   //       originalGLBObject.scene.traverse((oo) => {
    //   //         if (oo.userData.posMD5 === en.userData.posMD5) {
    //   //           if (oo.material) {
    //   //             en.material = oo.material.clone()
    //   //             en.material.needsUpdate = true
    //   //           }
    //   //           if (oo.geometry) {
    //   //             if (
    //   //               en.geometry.attributes.position.array.length !==
    //   //               oo.geometry.attributes.position.array.length
    //   //             ) {
    //   //               en.geometry = oo.geometry.clone()
    //   //               en.geometry.needsUpdate = true
    //   //             }
    //   //           }
    //   //         }
    //   //       })
    //   //     }
    //   //   }
    //   // })

    //   setReady(true)
    // })
  }, [glb, originalGLB])

  //
  return (
    <>
      <Suspense fallback={null}>
        <ENRunNode
          disabledNodes={disabledNodes}
          node={glb.scene}
          glbObject={glb}
        ></ENRunNode>
      </Suspense>
      {/* <EffectNodeObject></EffectNodeObject> */}
      {/* <group>
        {ready &&
          glbObject &&
          ens.length > 0 &&
          ens.map((en) => {
            return (
              <EffectNodeObject
                key={en.uuid + reloadGraphID + glbObject.uuid}
                glbObject={glbObject}
                item={en}
                disabledNodes={disabledNodes}
                effectNode={en.userData.effectNode}
              ></EffectNodeObject>
            )
          })}
      </group> */}
    </>
  )
}

//
