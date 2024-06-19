import { useEffect, useState } from 'react'
import { Vector2 } from 'three'

export function WinGeneric({ useStore, idx, win, topBar, children }) {
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
            if (mouseState.isDown && mouseState.winID === win._id && mouseState.func === 'moveWin') {
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

            if (mouseState.isDown && mouseState.winID === win._id && mouseState.func === 'resizeWinBR') {
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

                if (!isNaN(mouseState.delta[0])) {
                    win.width += mouseState.delta[0]
                }
                if (!isNaN(mouseState.delta[1])) {
                    win.height += mouseState.delta[1]
                }

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
            mouseState = {
                winID: '',
                func: 'moveWin',
                isDown: false,
                start: [0, 0],
                now: [0, 0],
                last: [0, 0],
                delta: [0, 0],
                accu: [0, 0],
            }

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
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                }}
                onClick={() => {}}
            >
                <div
                    className='w-full  flex justify-between'
                    style={{
                        height: `30px`,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        backgroundColor: 'white',
                    }}
                    onMouseDown={(ev) => {
                        //
                        mouseState.isDown = true
                        mouseState.winID = win._id
                        mouseState.func = 'moveWin'
                        mouseState.start = [ev.pageX, ev.pageY]
                        mouseState.now = [ev.pageX, ev.pageY]
                        mouseState.last = [ev.pageX, ev.pageY]
                        useStore.setState({
                            mouseState: { ...mouseState },
                        })
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
                        //
                    }}
                >
                    <div></div>
                    <div className=' select-none'>{topBar}</div>
                    <div></div>
                </div>
                <div
                    className='w-full'
                    style={{
                        userSelect: 'none',
                        height: `${win.height}px`,
                        backgroundColor: `hsl(${((idx / wins.length) * 360).toFixed(0)}, 50%, 50%)`,
                    }}
                >
                    {children}
                </div>
                <div
                    className='w-7 h-7 bg-gray-500 absolute -bottom-3 -right-3 rounded-full'
                    onMouseDown={(ev) => {
                        //
                        mouseState.isDown = true
                        mouseState.winID = win._id
                        mouseState.func = 'resizeWinBR'
                        mouseState.start = [ev.pageX, ev.pageY]
                        mouseState.now = [ev.pageX, ev.pageY]
                        mouseState.last = [ev.pageX, ev.pageY]
                        useStore.setState({
                            mouseState: { ...mouseState },
                        })

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
                ></div>
            </div>
            {/*  */}
        </>
    )
}
