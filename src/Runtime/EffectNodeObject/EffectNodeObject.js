import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Object3D } from 'three140'
import { Core } from '../Core/Core'
import { EffectNodeObjectLink } from './EffectNodeObjectLink'
import { EffectNodeObjectNode } from './EffectNodeObjectNode'
import { ENTJCore } from '../Core/ENTJCore'
import { EventEmitter } from '../Core/EventEmitter'
import { getID } from '../../utils/get-id'
export function EffectNodeObject({
  glbObject,
  item,
  effectNode,
  disabledNodes,
  codes,
}) {
  //
  let [enRuntime, setEnRuntime] = useState()

  //
  // let reloadGraphID = useENEditor((s) => s.reloadGraphID)
  // useENEditor((s) => s.overlay)
  // useAccessor((s) => s.selectedMeshes)

  //
  let get = useThree((s) => s.get)

  //
  useEffect(() => {
    // item.geometry?.computeBoundingSphere()
    // let center = item.geometry.boundingSphere.center
    // // let radius = item.geometry.boundingSphere.radius

    // //
    // let next = new Vector3()

    let mounter = new Object3D()
    // mounter.position.copy(next)
    let enRuntime = new ENTJCore({ name: item.name + getID() })
    enRuntime.now.eventsBus = new EventEmitter()
    Core.now.canvas = enRuntime

    let st = get()

    for (let kn in st) {
      enRuntime.now[kn] = st[kn]
    }
    enRuntime.now.mounter = mounter
    enRuntime.now.itself = item
    enRuntime.now.glbObject = glbObject

    //
    enRuntime.onLoop(() => {
      item.getWorldPosition(mounter.position)
      item.getWorldQuaternion(mounter.quaternion)
      item.getWorldScale(mounter.scale)

      // glbObject.scene.updateMatrixWorld(true)
      // item.getWorldPosition(mounter.position)

      //
      // console.log(item)
    })

    st.scene.add(mounter)

    setEnRuntime(enRuntime)

    return () => {
      if (enRuntime) {
        enRuntime.clean()
      }
    }
  }, [get, glbObject, item])

  useFrame(() => {
    enRuntime?.work()
  })
  //

  let on = (ev, h) => {
    enRuntime.now.eventsBus.addEventListener(ev, h)
    return () => {
      enRuntime.now.eventsBus.removeEventListener(ev, h)
    }
  }

  let emit = (ev, data) => {
    enRuntime.now.eventsBus.trigger(ev, data)
  }

  return (
    <>
      {enRuntime && (
        <>
          <group>
            {/*  */}
            {effectNode?.connections &&
              effectNode.connections.map((conn) => {
                return (
                  <EffectNodeObjectLink
                    key={conn._id + enRuntime.name}
                    link={conn}
                    allLinks={effectNode.connections}
                    on={on}
                    emit={emit}
                    enRuntime={enRuntime}
                  ></EffectNodeObjectLink>
                )
              })}

            {effectNode &&
              effectNode.nodes &&
              effectNode.nodes.map((node) => {
                return (
                  <EffectNodeObjectNode
                    key={
                      node._id +
                      enRuntime.name +
                      effectNode.connections.map((e) => e._id)
                    }
                    codes={codes}
                    disabledNodes={disabledNodes}
                    node={node}
                    glbObject={glbObject}
                    mounter={item}
                    on={on}
                    emit={emit}
                    effectNode={effectNode}
                    enRuntime={enRuntime}
                  ></EffectNodeObjectNode>
                )
              })}

            {effectNode && effectNode.nodes && (
              <AllReady
                nodes={effectNode.nodes}
                enRuntime={enRuntime}
              ></AllReady>
            )}
          </group>
        </>
      )}
    </>
  )
}

function AllReady({ nodes, enRuntime }) {
  useEffect(() => {
    let check = () => {
      return (
        nodes
          .map((node) => {
            return enRuntime.now['ok' + node._id]
          })
          .filter((e) => !e).length === 0
      )
    }
    let tt = setInterval(() => {
      let allOk = check()

      if (allOk) {
        clearInterval(tt)
        setTimeout(() => {
          enRuntime.now['all-ready'] = true
        }, 0)
      }
    })
  }, [enRuntime, nodes])
  return null
}
