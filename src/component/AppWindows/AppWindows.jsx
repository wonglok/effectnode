// import { createBuilder } from '@/src/encoder/createBuilder'
import { Editor } from './Win/Editor/Editor'
import { WinGeneric } from './Win/Generic/WinGeneric'
import { Preview } from './Win/Preview/Preview'

export function AppWindows({ useStore }) {
    // let apps = useStore((r) => r.apps)
    let wins = useStore((r) => r.wins)

    return (
        <>
            {wins.map((win, idx) => {
                return (
                    <WinGeneric
                        idx={idx}
                        win={win}
                        useStore={useStore}
                        topBar={<div>{win.title}</div>}
                        key={win._id + 'win'}
                    >
                        {win.type === 'editor' && (
                            <>
                                <Editor></Editor>
                            </>
                        )}

                        {win.type === 'preview' && (
                            <>
                                <Preview></Preview>
                            </>
                        )}

                        {/*  */}
                    </WinGeneric>
                )
            })}
        </>
    )
}
