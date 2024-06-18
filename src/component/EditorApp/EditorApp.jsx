import * as React from 'react'
import { BeginBar } from '../BeginBar/BeginBar'
export function EditorApp({ useStore }) {
    return (
        <div className='w-full h-full '>
            <div className='w-full from-gray-100 to-gray-500  bg-gradient-to-r' style={{ height: `1.6rem` }}>
                <div className='w-full h-full flex items-center justify-between px-2 text-sm'>
                    <div>EffectNode FX</div>
                    <div className=''></div>
                    <div className='text-white'>EffectNode FX</div>
                </div>
            </div>
            <div
                className='w-full bg-white'
                style={{
                    height: `calc(100% - 1.6rem - 1.6rem * 0.0 - 2.75rem)`,
                }}
            >
                {/*  */}

                {/*  */}

                {/*  */}
            </div>
            <div className='w-full from-gray-100 to-gray-500 bg-gradient-to-l ' style={{ height: `2.75rem` }}>
                <BeginBar useStore={useStore}></BeginBar>
            </div>
            {/* <div className='w-full from-gray-100 to-gray-500 bg-gradient-to-r ' style={{ height: `1.6rem` }}>
                <div className='w-full h-full flex items-center justify-between px-2 text-sm'>
                    <div className=''>EffectNode FX</div>
                    <div></div>
                    <div className='text-white'>Version: {version}</div>
                </div>
            </div> */}
        </div>
    )
}

//

//

//

//

//
