import { useEffect } from "react"

export function EditorApp ({ store }) {
    useEffect(() =>{
        console.log(store)
    }, [store])

    return <div>
        <div>234</div>
        <div>234</div>
        <div>234</div>
        456
    </div>
}

