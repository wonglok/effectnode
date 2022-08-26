import { EffectNodeObject } from '../EffectNodeObject/EffectNodeObject'

export function ENRunNode({ glbObject, node, disabledNodes }) {
  return (
    <>
      {node.userData?.effectNode && (
        <EffectNodeObject
          key={node.uuid}
          glbObject={glbObject}
          item={node}
          disabledNodes={disabledNodes}
          effectNode={node.userData.effectNode}
        ></EffectNodeObject>
      )}

      {/*  */}
      {node.children.map((it) => {
        return <ENRunNode key={it.uuid} node={it}></ENRunNode>
      })}
    </>
  )
}
