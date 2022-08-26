import md5 from 'md5'

export const signGLB = (glb) => {
  glb.scene.traverse((it) => {
    it.userData.posMD5 = md5(getSignature(it))
  })
}

let getSignature = (it) => {
  let str = '' + it.name

  if (it.geometry) {
    str += it.geometry.attributes.position?.array?.length + '-'
    str += it.geometry.attributes.normal?.array?.length + '-'
  }

  let k = 0
  it.traverse((sb) => {
    str += `${k}-${sb.name}`
    k += 1
  })

  // console.log(str)
  return str
}
