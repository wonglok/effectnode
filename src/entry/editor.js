import * as React from 'react'
import { createRoot } from 'react-dom/client'
import '../style/global.style.css'
import { create } from 'zustand'
import { EditorApp } from '../component/EditorApp/EditorApp'
/** @license
 * MIT License
 * @description
 * Copyright 2024 WONG LOK

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export class Editor {
    constructor() {
        let self = this
        this.cleans = []
        this.works = []
        this.isEditor = true
        this.domElement = document.createElement('div')
        this.domElement.classList.add('effectnode-app-container')
        this.store = create((set, get) => {
            return {
                self,
                set,
                get,
            }
        })

        this.setState = (v = {}) => {
            this.store.setState(v)
        }
        this.getState = () => {
            return this.store.getState()
        }
        this.onChange = (fnc) => {
            let clean = self.store.subscribe(fnc)
            this.cleans.push(clean)
        }

        this.onLoop = (fnc) => {
            this.works.push(fnc)
        }

        this.onClean = (fnc) => {
            this.cleans.push(fnc)
        }

        this.root = createRoot(this.domElement, {})
        this.root.render(<EditorApp parent={this}></EditorApp>)

        this.dispose = () => {
            this.works = []
            this.cleans.forEach((clean) => {
                clean()
            })
            this.root.unmount()
            if (this.domElement.parentNode) {
                this.domElement.parentNode.removeChild(this.domElement)
            }
        }
    }
}

//
