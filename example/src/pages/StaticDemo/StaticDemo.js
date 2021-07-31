import React, { useEffect, useRef, useState } from 'react'
import { ENRuntime, processRawData } from 'effectnode'
import { Canvas, useFrame } from '@react-three/fiber'

export function StaticDemo() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <EffectNodeInFiber></EffectNodeInFiber>
      </Canvas>
    </div>
  )
}

export function EffectNodeInFiber() {
  let mounter = useRef()
  let graph = useRef()
  let [myInst, setCompos] = useState(() => {
    return <group></group>
  })

  useEffect(() => {
    graph.current = new ENRuntime({
      json: processRawData(getRawJSON()),
      codes: getCodes()
    })

    graph.current.mini.get('DefaultComponent').then((v) => {
      setCompos(v)
    })

    return () => {
      if (graph.current) {
        graph.current.mini.clean()
        graph.current.clean()
      }
    }
  }, [])

  useFrame(({ get }) => {
    let three = get()
    if (graph.current) {
      for (let kn in three) {
        graph.current.mini.set(kn, three[kn])
      }
      if (mounter.current) {
        graph.current.mini.set('mounter', mounter.current)
      }
      graph.current.mini.work()
    }
  })

  return (
    <>
      <group ref={mounter}>{myInst}</group>
    </>
  )
}

export const getCodes = () => {
  let path = require('path')
  let r = require.context('./vfx-codes', true, /\.js$/, 'lazy')

  function importAll(r) {
    let arr = []
    r.keys().forEach((key) => {
      let filename = path.basename(key)

      arr.push({
        title: filename,
        loader: () => r(key)
      })
    })

    return arr
  }
  let codes = importAll(r)

  return codes
}

export const getRawJSON = () => {
  return {
    NGpUixuU0NOkOlmLsLuepkaZxxt1: {
      connections: {
        '-MdPINDxi9T3AotCKSfB': {
          _id: '_via641l4y3wgloaeb7',
          input: {
            _id: '_od5ohzl5avwo3ltnf8',
            nodeID: '_lka05oa2emaxqkxd7w',
            type: 'input'
          },
          output: {
            _id: '_iys0bi1wbszoajdrbq',
            nodeID: '_sbhxwatnnvkk95yslm',
            type: 'output'
          }
        }
      },
      nodes: {
        '-MdFPnHiFrg5AXKZPPLV': {
          _id: '_lka05oa2emaxqkxd7w',
          inputs: [
            {
              _id: '_od5ohzl5avwo3ltnf8',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'input'
            },
            {
              _id: '_fbb9aoyc66f0f057p4',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'input'
            },
            {
              _id: '_kbb8xyxn4zegnkmww4',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'input'
            },
            {
              _id: '_j27f14qjt3crj7jrkm',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'input'
            },
            {
              _id: '_5awgse7wgryzl4unfr',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'input'
            }
          ],
          outputs: [
            {
              _id: '_wcz630splzoznvol9b',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'output'
            },
            {
              _id: '_yn1yu9pye1gep7hui2',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'output'
            },
            {
              _id: '_aydf7dn80m375qhcus',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'output'
            },
            {
              _id: '_p9k078jvmtv2muzw8t',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'output'
            },
            {
              _id: '_g4d8r8w1y5ybgdutey',
              nodeID: '_lka05oa2emaxqkxd7w',
              type: 'output'
            }
          ],
          position: [
            13.81351241290946, -6.268112984381583e-15, 28.229071300777065
          ],
          title: 'lok.mySecondNode.js'
        },
        '-MdMk9rFgJSESwDybIfB': {
          _id: '_sbhxwatnnvkk95yslm',
          inputs: [
            {
              _id: '_dzsph16c3ubtltaukb',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'input'
            },
            {
              _id: '_8oxaioc4n4xche1mmi',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'input'
            },
            {
              _id: '_h67wqxjauc8uit6qzf',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'input'
            },
            {
              _id: '_txfnifvgobsqp7wkno',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'input'
            },
            {
              _id: '_hh7yqw6u0kaa2f4vsr',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'input'
            }
          ],
          outputs: [
            {
              _id: '_iys0bi1wbszoajdrbq',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'output'
            },
            {
              _id: '_s06csj99keboy364wd',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'output'
            },
            {
              _id: '_r94f0g30633kompktd',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'output'
            },
            {
              _id: '_lm15qdzn3k08zt783f',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'output'
            },
            {
              _id: '_izp3hqkt018y23lwk0',
              nodeID: '_sbhxwatnnvkk95yslm',
              type: 'output'
            }
          ],
          position: [
            23.8559458588784, 1.363425432176458e-15, -6.1403222682973535
          ],
          title: 'lok.myFristNode.js'
        }
      }
    }
  }
}

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}
