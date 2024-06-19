import { useEffect, useState } from 'react'
import { WinGeneric } from './Win/Generic/WinGeneric'

export function AppWindows({ useStore }) {
    // let apps = useStore((r) => r.apps)
    let wins = useStore((r) => r.wins)

    return (
        <>
            {/*  */}

            {wins.map((win, idx) => {
                return (
                    <WinGeneric
                        idx={idx}
                        win={win}
                        useStore={useStore}
                        topBar={<div>{win.title}</div>}
                        key={win._id + 'win'}
                    >
                        123
                    </WinGeneric>
                )
            })}
        </>
    )
}
