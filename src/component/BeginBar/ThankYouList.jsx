export function ThankYouList({ useStore }) {
    let activatePop = useStore((r) => r.activatePop)

    return (
        <>
            {/*  */}
            {activatePop == 'credits' && (
                <div
                    className=' absolute bottom-5 right-5 shadow-2xl p-2 rounded-2xl border-gray-300 border  backdrop-blur-lg  bg-blue-200  bg-opacity-20 '
                    style={{ width: '500px', height: '500px', aleft: `calc(50% - 500px / 2)` }}
                >
                    <div className='bg-white p-3 w-full h-full rounded-xl shadow-inner border-gray-300 border'>
                        <h1 className='mb-1 text-2xl underline'>Begin Menu</h1>
                        <div>123</div>
                    </div>
                </div>
            )}
            {/*  */}
        </>
    )
}
