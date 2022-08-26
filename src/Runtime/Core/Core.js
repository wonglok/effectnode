import { Object3D } from 'three'
import { ENTJCore } from './ENTJCore'

export const Core = new ENTJCore({ name: 'thank you jesus' })
Core.now.goToPlace = new Object3D()
Core.now.goToPlace.visible = false
Core.now.avatarAct = 'standing'
Core.now.onHover0 = new Object3D()
Core.now.onHover1 = new Object3D()
