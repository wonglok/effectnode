import { useEffect } from "react"

export function EditorApp({ store }) {
    useEffect(() => {
        console.log(store)
    }, [store])

    return <div>
        <button onClick={() =>{

            console.log('yo')
        }}>Click</button>
        <div>234</div>
        <div>234</div>
        <div>234</div>
    </div>
}
//

//

//

//

//

//

//

//
