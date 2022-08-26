let path = require('path')

function getV0() {
  let r = require.context('@/src/EffectNodes/', true, /\.en\.js$/, 'lazy')

  function importAll(r) {
    let arr = []

    r.keys().forEach((key) => {
      let filename = path.basename(key)
      filename = filename.replace('.en.js', '')

      arr.push({
        title: filename,
        key,
        path: `./${path.basename(key)}`,
        loader: () => r(key),
      })
    })

    return arr
  }

  return importAll(r)
}

const v0 = getV0()

const all = [...v0]
export { v0, all }

//
//
//
