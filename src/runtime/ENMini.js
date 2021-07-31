import { getID } from './ENUtils'

export class ENMini {
  constructor({ parent = false }) {
    this.name = 'ENMini'

    this.parent = parent

    this.resource = new Map()

    this.get = (k) => {
      return new Promise((resolve) => {
        let ttt = 0
        ttt = setInterval(() => {
          if (this.parent) {
            if (this.resource.has(k) || this.parent.resource.has(k)) {
              clearInterval(ttt)
              resolve(this.resource.get(k) || this.parent.resource.get(k))
            }
          } else {
            if (this.resource.has(k)) {
              clearInterval(ttt)
              resolve(this.resource.get(k))
            }
          }
        })
      })
    }

    let NS = getID()
    this.set = (key, v) => {
      this.resource.set(key, v)
      window.dispatchEvent(new window.CustomEvent(`${NS}${key}`, { detail: v }))
    }

    this.onChange = (key, fnc) => {
      let h = ({ detail: v }) => {
        fnc(v)
      }
      this.get(key).then(fnc)
      window.addEventListener(`${NS}${key}`, h)
      this.onClean(() => {
        window.removeEventListener(`${NS}${key}`, h)
      })
    }

    let isAborted = false
    this.tasks = []
    this.resizeTasks = []
    this.cleanTasks = []
    this.onLoop = (fnc, num = 0) => {
      if (num >= 0) {
        this.tasks.push(fnc)
      } else {
        this.tasks.unshift(fnc)
      }
    }

    this.onResize = (fnc) => {
      fnc()
      this.resizeTasks.push(fnc)
    }

    this.onClean = (func) => {
      this.cleanTasks.push(func)
    }

    let intv = 0
    let internalResize = () => {
      clearTimeout(intv)
      intv = setTimeout(() => {
        this.resizeTasks.forEach((e) => e())
      }, 16.8888)
    }

    window.addEventListener('resize', () => {
      internalResize()
    })

    let isPaused = false
    this.toggle = () => {
      isPaused = !isPaused
    }
    this.pause = () => {
      isPaused = true
    }
    this.play = () => {
      isPaused = false
    }

    this.clean = () => {
      isAborted = true
      try {
        this.cleanTasks.forEach((e) => e())
      } catch (e) {
        console.error(e)
      }
    }

    this.lastTime = window.performance.now()
    this.work = () => {
      this.timeNow = window.performance.now()
      if (isAborted) {
        return {
          name: this.name,
          duration: 0
        }
      }
      if (isPaused) {
        return {
          name: this.name,
          duration: 0
        }
      }
      let start = window.performance.now()
      try {
        let t = this.timeNow
        let lt = this.lastTime
        let dt = t - lt
        this.lastTime = t
        dt = dt / 1000
        t = t / 1000
        if (dt >= 100) {
          dt = 100
        }

        this.tasks.forEach((e) => e(t, dt))
      } catch (e) {
        console.error(e)
      }
      let end = window.performance.now()
      let duration = end - start

      return {
        name: this.name,
        duration
      }
    }

    this.ready = new Proxy(
      {},
      {
        get: (obj, key) => {
          return this.get(key)
        }
      }
    )

    this.now = new Proxy(
      {},
      {
        get: (obj, key) => {
          if (this.parent) {
            return this.resource.get(key) || this.parent.resource.get(key)
          } else {
            return this.resource.get(key)
          }
        }
      }
    )
  }
}

// let mini = new Mini({ name: "base", domElement: ref.current, window });
//

//
//
//
