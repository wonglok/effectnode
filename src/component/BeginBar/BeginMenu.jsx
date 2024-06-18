import logo from './img/logo.svg'
export function BeginMenu({ useStore }) {
    let activatePop = useStore((r) => r.activatePop)

    return (
        <>
            {/*  */}
            {activatePop === 'menu' && (
                <div
                    className=' absolute bottom-5 shadow-2xl p-2 rounded-2xl border-gray-300 border  backdrop-blur-lg  bg-blue-200  bg-opacity-20 '
                    style={{ width: '500px', height: '500px', left: `calc(50% - 500px / 2)` }}
                >
                    <div className='bg-white p-5 w-full h-full rounded-xl shadow-inner border-gray-300 border'>
                        <div className='flex-col flex items-center'>
                            <div className='flex items-center mb-2'>
                                <img className='h-12' src={logo} alt='effectnode'></img>
                            </div>
                            <div className='text-2xl'>Menu</div>
                        </div>
                    </div>
                </div>
            )}
            {/*  */}
        </>
    )
}
