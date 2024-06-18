import logo from './img/logo.svg'
export function BeginMenu({ useStore }) {
    let overlayPop = useStore((r) => r.overlayPop)

    return (
        <>
            {/*  */}
            {overlayPop === 'menu' && (
                <div
                    className=' absolute bottom-5 shadow-2xl p-2 rounded-2xl border-gray-300 border  backdrop-blur-lg  bg-white  bg-opacity-20 '
                    style={{ width: '500px', height: '500px', left: `calc(50% - 500px / 2)` }}
                >
                    <div className='absolute -top-10 -right-10 shadow-lg p-5 rounded-2xl border-gray-300 border  backdrop-blur-lg  bg-white '>
                        <img className='h-12 select-none ' src={logo} alt='effectnode'></img>
                    </div>
                </div>
            )}
            {/*  */}
        </>
    )
}
