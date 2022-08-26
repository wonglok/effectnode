import { EffectNodeObject } from '../EffectNodeObject/EffectNodeObject'

export function ENRunNode({ codes, glbObject, node, disabledNodes }) {
  return (
    <>
      {node.userData?.effectNode && (
        <EffectNodeObject
          key={node.uuid}
          codes={codes}
          glbObject={glbObject}
          item={node}
          disabledNodes={disabledNodes}
          effectNode={node.userData.effectNode}
        ></EffectNodeObject>
      )}

      {/*  */}
      {node.children.map((it) => {
        return <ENRunNode codes={codes} key={it.uuid} node={it}></ENRunNode>
      })}
    </>
  )
}
