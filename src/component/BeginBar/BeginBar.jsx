import * as React from 'react'
import { version } from '../../../package.json'

export function BeginBar({ useStore }) {
    // let wins = useStore((r) => r.wins)

    let apps = useStore((r) => r.apps)

    return (
        <>
            <div className='w-full h-full flex items-center justify-between text-sm'>
                <div>
                    {/*  */}

                    {/*  */}
                </div>
                <div className='flex justify-start'>
                    <div className='bg-gray-800 text-white fill-white h-11 flex items-center justify-center w-11 cursor-pointer'>
                        <svg
                            width='24'
                            height='24'
                            xmlns='http://www.w3.org/2000/svg'
                            fillRule='evenodd'
                            clipRule='evenodd'
                        >
                            <path d='M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z' />
                        </svg>
                    </div>

                    {apps.map((app) => {
                        return (
                            <div
                                key={app._id}
                                className='bg-gray-300 fill-gray-800 border-r border-gray-200 h-11 flex items-center justify-center px-3 text-xs cursor-pointer'
                            >
                                {app.appIconText}
                            </div>
                        )
                    })}

                    <div className='bg-gray-300 fill-gray-800 border-r border-gray-200 h-11 flex items-center justify-center w-11 cursor-pointer'>
                        <svg
                            width='24'
                            height='24'
                            xmlns='http://www.w3.org/2000/svg'
                            fillRule='evenodd'
                            clipRule='evenodd'
                        >
                            <path d='M16 3.383l-.924-.383-7.297 17.617.924.383 7.297-17.617zm.287 3.617l6.153 4.825-6.173 5.175.678.737 7.055-5.912-7.048-5.578-.665.753zm-8.478 0l-6.249 4.825 6.003 5.175-.679.737-6.884-5.912 7.144-5.578.665.753z' />
                        </svg>
                    </div>
                    <div className='bg-gray-300 fill-gray-800 border-r border-gray-200 h-11 flex items-center justify-center w-11 cursor-pointer'>
                        <svg
                            width='24'
                            height='24'
                            xmlns='http://www.w3.org/2000/svg'
                            fillRule='evenodd'
                            clipRule='evenodd'
                        >
                            <path d='M16 3.383l-.924-.383-7.297 17.617.924.383 7.297-17.617zm.287 3.617l6.153 4.825-6.173 5.175.678.737 7.055-5.912-7.048-5.578-.665.753zm-8.478 0l-6.249 4.825 6.003 5.175-.679.737-6.884-5.912 7.144-5.578.665.753z' />
                        </svg>
                    </div>
                </div>
                <div className=''>
                    <div className='flex flex-col justify-end mr-2'>
                        <div className='text-right'>v{version}</div>
                        <div className='text-right'>Effect Node FX</div>
                    </div>
                </div>
            </div>
        </>
    )
}
