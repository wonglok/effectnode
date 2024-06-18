import * as React from 'react'
import { version } from '../../../package.json'
import icon from './img/effectnode-icon.svg'

export function BeginBar({ useStore }) {
    // let wins = useStore((r) => r.wins)
    let apps = useStore((r) => r.apps)
    let activatePop = useStore((r) => r.activatePop)
    return (
        <>
            <div className='w-full h-full flex items-center justify-between text-sm'>
                <div className=' w-44'>
                    {/*  */}

                    {/*  */}
                </div>
                <div className='flex justify-start'>
                    <div
                        onClick={() => {
                            if (activatePop) {
                                useStore.setState({ activatePop: '' })
                            } else {
                                useStore.setState({ activatePop: 'menu' })
                            }
                        }}
                        className='bg-white rounded-full overflow-hidden h-9 m-1 px-4 flex items-center justify-center cursor-pointer'
                    >
                        <img className='fill-white h-full bg-white py-2 select-none' src={icon}></img>
                    </div>

                    {apps.map((app) => {
                        return (
                            <div className='bg-white text-black rounded-full overflow-hidden h-9 m-1 px-4 flex items-center justify-center cursor-pointer'>
                                {app.appIconText}
                            </div>
                        )
                    })}
                </div>
                <div className='w-44'>
                    <div className='flex flex-col justify-end mr-2'>
                        <div className='text-right'>v{version}</div>
                        <div
                            className='text-right underline cursor-pointer'
                            onClick={() => {
                                //
                                if (activatePop) {
                                    useStore.setState({ activatePop: '' })
                                } else {
                                    useStore.setState({ activatePop: 'credits' })
                                }

                                //
                            }}
                        >
                            About Credits
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
