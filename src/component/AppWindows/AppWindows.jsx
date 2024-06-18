import { useEffect, useState } from 'react'

export function AppWindows() {
    let [scale, setScale] = useState(1)
    useEffect(() => {
        setScale((1 / window.devicePixelRatio) * 0.333)
    }, [])
    return (
        <>
            {/*  */}
            <Canvas>
                <NoRender></NoRender>

                <ambientLight intensity={1}></ambientLight>
                <DragControls></DragControls>
                <Box rotation={[0, 0.13, 0]}>
                    <Html scale={scale} transform>
                        <div className='bg-gray-200 bg-opacity-20' style={{ width: '500px', height: '500px' }}>
                            123
                        </div>
                    </Html>
                    <meshStandardMaterial color={'red'}></meshStandardMaterial>
                </Box>
            </Canvas>
            {/*  */}
        </>
    )
}

function NoRender() {
    useFrame(({ gl, scene, camera }) => {
        gl.render(scene, camera)
    }, 1)
    return null
}
