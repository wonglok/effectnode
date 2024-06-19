import { useEffect, useState } from 'react'
import { Vector2 } from 'three'

export function WinGeneric({ useStore, idx, win, children }) {
    let apps = useStore((r) => r.apps)
    let wins = useStore((r) => r.wins)
    let mouseState = useStore((r) => r.mouseState)

    console.log(win.top)
    useEffect(() => {
        if (!mouseState) {
            return
        }
        let hh = (ev) => {
            //
            //
            if (mouseState.isDown && mouseState.winID === win._id) {
                mouseState.now = [ev.pageX, ev.pageY]

                mouseState.delta = [
                    //
                    mouseState.now[0] - mouseState.last[0],
                    mouseState.now[1] - mouseState.last[1],
                ]
                mouseState.last = [ev.pageX, ev.pageY]

                mouseState.accu = [
                    //
                    mouseState.accu[0] + mouseState.delta[0],
                    mouseState.accu[1] + mouseState.delta[1],
                ]

                win.top += mouseState.delta[1]
                win.left += mouseState.delta[0]

                useStore.setState({
                    mouseState: {
                        ...mouseState,
                    },
                    wins: [...wins],
                })
            }
            //
            //
        }
        window.addEventListener('mousemove', hh)

        return () => {
            window.removeEventListener('mousemove', hh)
        }
    }, [mouseState, win])

    useEffect(() => {
        if (!mouseState) {
            return
        }
        let hh = (ev) => {
            //
            //
            mouseState.isDown = false
            mouseState.winID = ''
            mouseState.start = [
                //
                0, 0,
            ]
            useStore.setState({
                mouseState: { ...mouseState },
            })
        }
        window.addEventListener('mouseup', hh)

        return () => {
            window.removeEventListener('mouseup', hh)
        }
    }, [mouseState, win])
    return (
        <>
            <div
                key={win._id + 'win'}
                style={{
                    position: 'absolute',
                    zIndex: `${win.zIndex}`,
                    top: `${win.top}px`,
                    left: `${win.left}px`,
                    width: `${win.width}px`,
                    height: `${win.height + 30}px`,
                    border: `gray solid 1px`,
                }}
                onClick={() => {
                    let idx = wins.findIndex((w) => w._id === win._id)
                    wins.splice(idx, 1)
                    wins.push(win)

                    wins = wins.map((eachWin, idx) => {
                        eachWin.zIndex = idx
                        return eachWin
                    })

                    useStore.setState({
                        apps: [...apps],
                        wins: [...wins],
                    })
                }}
            >
                <div
                    className='w-full'
                    style={{
                        height: `30px`,
                        backgroundColor: 'white',
                    }}
                    onMouseDown={(ev) => {
                        //
                        mouseState.isDown = true
                        mouseState.winID = win._id
                        mouseState.start = [ev.pageX, ev.pageY]
                        mouseState.last = [ev.pageX, ev.pageY]
                        useStore.setState({
                            mouseState: { ...mouseState },
                        })
                        //
                    }}
                ></div>
                <div
                    className='w-full'
                    style={{
                        height: `${win.height}px`,
                        backgroundColor: `hsl(${idx * 10}, 50%, 50%)`,
                    }}
                >
                    {children}
                </div>
            </div>
            {/*  */}
        </>
    )
}
