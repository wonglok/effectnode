import { getID } from '../utils/getID'
import logo from './img/logo.svg'
export function BeginMenu({ useStore }) {
    let overlayPop = useStore((r) => r.overlayPop)
    let wins = useStore((r) => r.wins)
    let apps = useStore((r) => r.apps)
    //
    return (
        <>
            {/*  */}
            {overlayPop === 'menu' && (
                <>
                    <div
                        className='z-[100] absolute bottom-0 top-0 w-full h-full border-gray-300 border  bg-black bg-opacity-10 '
                        style={{}}
                        onClick={() => {
                            useStore.setState({
                                overlayPop: '',
                            })
                        }}
                    >
                        {/*  */}

                        {/*  */}

                        {/*  */}
                    </div>
                </>
            )}
            {overlayPop === 'menu' && (
                <div
                    className='z-[101] absolute bottom-5 shadow-2xl p-5 rounded-2xl border-gray-300 border  bg-white '
                    style={{ width: '500px', height: '500px', left: `calc(50% - 500px / 2)` }}
                >
                    <div className='absolute -top-10 -right-10 p-5  shadow-lg  rounded-2xl border-gray-300 border   bg-white '>
                        <img className='h-12 select-none ' src={logo} alt='effectnode'></img>
                    </div>

                    <div>
                        <div
                            onClick={() => {
                                if (!apps.some((r) => r.type === 'editor')) {
                                    let appID = getID()
                                    apps.push({
                                        _id: appID,
                                        type: 'editor',
                                        appIconText: ' 👨🏼‍💻 Editor',
                                        wins: [],
                                    })
                                    wins.push({
                                        _id: getID(),
                                        appID: appID,
                                        type: 'editor',
                                        top: 10,
                                        left: 10,
                                        width: 100,
                                        height: 100,
                                        zIndex: wins.length,
                                    })
                                    useStore.setState({
                                        apps: [...apps],
                                        wins: [...wins],
                                        overlayPop: '',
                                    })
                                }
                            }}
                            className='cursor-pointer mr-3 mb-3 select-none inline-block p-5 px-6 shadow-md hover:shadow-xl hover:bg-gray-100 active:shadow-lg transition-all duration-300 rounded-2xl border-gray-300 border '
                        >
                            👨🏼‍💻 Editor
                        </div>
                        <div
                            onClick={() => {
                                //
                                if (!apps.some((r) => r.type === 'previwer')) {
                                    let appID = getID()
                                    apps.push({
                                        _id: appID,
                                        type: 'previwer',
                                        appIconText: ' 🖼️ Previwer',
                                        wins: [],
                                    })
                                    wins.push({
                                        _id: getID(),
                                        appID: appID,
                                        type: 'previwer',
                                        top: 20,
                                        left: 20,
                                        width: 100,
                                        height: 100,
                                        zIndex: wins.length,
                                    })
                                    useStore.setState({
                                        apps: [...apps],
                                        wins: [...wins],
                                        overlayPop: '',
                                    })
                                }
                            }}
                            className='cursor-pointer mr-3 mb-3 select-none inline-block p-5 px-6 shadow-md hover:shadow-xl hover:bg-gray-100 active:shadow-lg transition-all duration-300 rounded-2xl border-gray-300 border '
                        >
                            🖼️ Previewer
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
