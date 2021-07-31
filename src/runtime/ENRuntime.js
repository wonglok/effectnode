import { ENMini } from './ENMini'
import { EventEmitter } from './ENUtils.js'

export class ENRuntime {
  constructor({
    json = false,
    codes = [],
    codeIDKey = 'title',
    codeLoaderKey = 'loader'
  }) {
    this.events = new EventEmitter()

    if (!codes) {
      throw new Error('needs code batteries')
    }
    if (!json) {
      throw new Error('needs code batteries')
    }

    this.json = json
    this.codes = codes

    this.mini = new ENMini({})

    this.clean = () => {
      this.mini.clean()
    }

    const on = (ev, h) => {
      this.events.addEventListener(ev, h)
      this.mini.onClean(() => {
        this.events.removeEventListener(ev, h)
      })
    }
    const emit = (ev, data) => {
      this.events.trigger(ev, data)
    }

    this.json.connections.forEach((conn) => {
      on(conn.data.output._id, (data) => {
        emit(conn.data.input._id, data)
      })
    })

    this.json.nodes.forEach((node) => {
      const title = node.data.title

      const subAPIs = new Map()

      const inputs = node.data.inputs
      const outputs = node.data.outputs

      inputs.forEach((input, idx) => {
        let answer = false

        let api = {
          stream: (onReceive) => {
            on(input._id, onReceive)
          },
          get ready() {
            return new Promise((resolve) => {
              let tt = setInterval(() => {
                if (answer) {
                  clearInterval(tt)
                  resolve(answer)
                }
              }, 0)
            })
          }
        }

        on(input._id, (v) => {
          answer = v
        })

        subAPIs.set(`in${idx}`, api)
      })

      outputs.forEach((output, idx) => {
        subAPIs.set(`out${idx}`, {
          pulse: (data) => {
            emit(output._id, data)
          }
        })
      })

      let ioAPIs = new Proxy(
        {},
        {
          get: (obj, key) => {
            //
            if (key.indexOf('in') === 0 && !isNaN(key[2])) {
              return subAPIs.get(key)
            }

            if (key.indexOf('out') === 0 && !isNaN(key[3])) {
              return subAPIs.get(key)
            }
            //
          }
        }
      )

      const features = codes.find((e) => e[codeIDKey] === title)

      if (features) {
        features[codeLoaderKey]()
          .then(async (code) => {
            return await code.effect({ mini: this.mini, node: ioAPIs })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

    this.mini.set('all-ready', true)
  }
}

class NewCorsXHR {
  constructor(type, url) {
    var xhr = false
    try {
      xhr = new window.XMLHttpRequest()
    } catch (e) {}
    if (xhr && 'withCredentials' in xhr) {
      xhr.open(type, url, true) // Standard Cors request
    } else if (typeof XDomainRequest !== 'undefined') {
      xhr = new window.XDomainRequest() // IE Cors request
      xhr.open(type, url)
      xhr.onload = function () {
        xhr.readyState = 4
        if (xhr.onreadystatechange instanceof Function) {
          xhr.onreadystatechange()
        }
      }
    } else if (xhr) {
      xhr.open(type, url, true)
    }
    return xhr
  }
}

export function getJSON({ url }) {
  return new Promise((resolve, reject) => {
    var xhr = new NewCorsXHR('GET', url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          let json = JSON.parse(xhr.responseText)
          resolve(json)
        } catch (e) {
          reject(e)
        }
      }
    }
    xhr.send()
  })
}
/**
 * @param {string} url
 */
function removeTrailingSlashes(url) {
  return url.replace(/\/+$/, '') // Removes one or more trailing slashes from URL
}

export async function getEffectNodeData({ firebaseConfig, graphID }) {
  let url = `${removeTrailingSlashes(
    firebaseConfig.databaseURL
  )}/canvas/${graphID}.json`

  //
  return getJSON({ url }).then(processRawData, () => {
    return false
  })
}

export const processRawData = (response) => {
  let ans = false
  for (let kn in response) {
    if (!ans) {
      ans = response[kn]
    }
  }

  //
  if (ans) {
    let connections = []

    for (let kn in ans.connections) {
      connections.push({
        _fid: kn,
        data: ans.connections[kn]
      })
    }

    let nodes = []
    for (let kn in ans.nodes) {
      nodes.push({
        _fid: kn,
        data: ans.nodes[kn]
      })
    }

    return {
      connections,
      nodes
    }
  } else {
    return false
  }
}
